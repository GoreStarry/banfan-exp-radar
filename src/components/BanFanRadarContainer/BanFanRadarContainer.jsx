import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import cx from "classnames";
// import { getBggThing } from "bgg-xml-api-client";
// import { useStateValidator, useWindowSize } from "react-use";
import useStore from "../../store/useStore";
import html2canvas from "html2canvas";
import canvasToImage from "canvas-to-image";
import { isIOS, isAndroid } from "react-device-detect";
import * as THREE from "three";
import axios from "axios";
import { Prompt, Alert } from "react-st-modal";
import shallow from "zustand/shallow";

import sty from "./BanFanRadarContainer.module.scss";

import useResizeContainerSize from "../../hooks/useResizeContainerSize";

import ThreeRadarChart from "../../ThreeRadarChart";
import FanSlider from "../FanSlider";
import BgBlurCanvas from "../BgBlurCanvas";
import {
  saveLabelToLocalStorage,
  getLabelFromLocalStorage,
  getUserName,
  saveUserName,
} from "./localStorageHandler.js";

import "css-reset-and-normalize/css/reset-and-normalize.min.css";
import "css-reset-and-normalize/css/button-reset.min.css";

const BanFanRadarContainer = ({
  gameName = "Loading...",
  imgUrlGameCover,
  data: dataInit = [
    { name: "美術", value: 3 },
    { name: "策略？", value: 3 },
    { name: "？？？", value: 1 },
  ],
  ...args
}) => {
  const [savedImgDataURL, setSavedImgDataURL] = useState();

  const refContainer = useRef();
  const [data, setData] = useState(getLabelFromLocalStorage() || dataInit);
  const [isTriggerSaveImage, setIsTriggerSaveImage] = useState(false);
  const [isFinalScoreMode, setIsFinalScoreMode] = useState(false);
  const [user_name, setUserName] = useState("");
  const [point, setPoint] = useState(0);
  const [isSaveImageMode, setIsSaveImageMode] = useState(false);

  const radarPositionMap = useMemo(
    () => ({
      3: { scale: 1.5, finScale: 1.65, position: [0, -0.8, 0] },
      4: { scale: 1.35, finScale: 1.45, position: [0, -0.3, 0] },
      5: { scale: 1.45, finScale: 1.45, position: [0, -0.6, 0] },
      6: { scale: 1.35, finScale: 1.45, position: [0, -0.3, 0] },
      7: { scale: 1.35, finScale: 1.45, position: [0, -0.5, 0] },
      8: { scale: 1.35, finScale: 1.45, position: [0, -0.3, 0] },
    }),
    []
  );

  const { focusPointIndex } = useStore(
    useCallback(
      (state) => ({
        focusPointIndex: state.focusPointIndex,
      }),
      []
    ),
    shallow
  );

  const [radarStyles, setRadarStyles] = useState({
    scale: radarPositionMap[data?.length]?.scale,
    position: radarPositionMap[data?.length]?.position,
  });

  const { width: containerWidth, height: containerHeight } =
    useResizeContainerSize(refContainer);
  const spriteMaterialColor = useMemo(() => new THREE.Color(10, 10, 10), []);

  const [maxValue, setMaxValue] = useState(5);
  const unLockMaxValueLimit = useCallback(() => {
    setMaxValue(10);
  }, []);

  useEffect(() => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const gameID = urlParams.get("id");

    refContainer.current.addEventListener("touchmove", function (e) {
      e.preventDefault();
    });

    // axios
    //   .get(`https://slides-together.vercel.app/api/getRadarTopic?id=${gameID}`)
    //   .then(({ data: { name, imgUrl } }) => {
    //     setImgUrlGameCover(imgUrl);
    //     setGameName(name);
    //   })
    //   .catch((err) => {
    //     alert("好像沒這桌耶...？？？");
    //   });

    if (isAndroid) {
      setTimeout(
        () =>
          document
            .querySelector("meta[name=viewport]")
            .setAttribute(
              "content",
              "height=" +
                window.innerHeight * 0.9 +
                "px, width=device-width, initial-scale=1.0"
            ),
        300
      );
    }
    return () => {};
  }, []);

  useEffect(() => {
    const { position, scale } = radarPositionMap[data.length];

    setRadarStyles({
      scale,
      position,
    });
    return () => {};
  }, [data.length]);

  useEffect(() => {
    if (isAndroid) {
      const { position, scale } = radarPositionMap[data.length];
      if (focusPointIndex) {
        setRadarStyles({
          scale,
          position: [position[0], position[1] + 0.5, position[2]],
        });
      } else {
        setRadarStyles({
          scale,
          position,
        });
      }
    }
    return () => {};
  }, [focusPointIndex]);

  useEffect(() => {
    if (isFinalScoreMode) {
      useStore.setState({
        isClickOutLabel: true,
        isResetCamera: true,
      });
      const { finScale, scale, position } = radarPositionMap[data.length];
      setRadarStyles({
        scale: scale,
        position,
        rotation: [0, 2 * Math.PI, 0],
      });
    } else {
      const { scale, position } = radarPositionMap[data.length];
      setRadarStyles({ scale, position, rotation: [0, 0, 0] });
    }
    return () => {};
  }, [isFinalScoreMode]);

  const maxLengthData = 6;

  const onChangeInputLabel = useCallback((value, index) => {
    setData((prevData) => {
      return [
        ...prevData.slice(0, index),
        {
          name: value,
          value: prevData[index].value,
        },
        ...prevData.slice(index + 1),
      ];
    });
  }, []);

  const onChangeValue = useCallback((value, index) => {
    setData((prevData) => {
      return [
        ...prevData.slice(0, index),
        {
          name: prevData[index].name,
          value,
        },
        ...prevData.slice(index + 1),
      ];
    });
  }, []);

  const deleteDataItem = useCallback((index) => {
    setData((prevData) => {
      return [...prevData.slice(0, index), ...prevData.slice(index + 1)];
    });
  }, []);

  const addDataItem = useCallback(() => {
    setData(([data1, ...prevData]) => {
      return [data1, { name: "", value: 0.5 }, ...prevData];
    });
  }, []);

  const saveImage = useCallback(() => {
    html2canvas(refContainer.current, {
      scale: window.devicePixelRatio * 2,
      useCORS: true,
    }).then(function (canvas) {
      // document.body.appendChild(canvas);
      if (isIOS) {
        Alert("iOS 請長壓圖片，加入「照片」");
        setSavedImgDataURL(canvas.toDataURL("image/jpeg", 1.0));
        setIsSaveImageMode(true);
      } else {
        // setSavedImgDataURL(canvas.toDataURL("image/jpeg", 1.0));
        canvasToImage(canvas, {
          name: `${gameName} - 體驗雷達`,
          type: "jpg",
          quality: 1,
        });
      }
    });
    // html2pdf(refContainer.current);

    // setIsTriggerSaveImage(true);
  }, [gameName]);

  const onCompleteSaveImage = useCallback(() => {
    setIsTriggerSaveImage(false);
  }, []);

  const completeExperience = useCallback(async () => {
    setData((prev) => {
      saveLabelToLocalStorage(prev);
      return prev;
    });
    let name;
    if (!user_name) {
      name = await Prompt("暱稱：(選填)", {
        defaultValue: getUserName(),
      });
      // name = prompt("暱稱：(選填)", user_name);
      saveUserName(name);
      name && setUserName(name);
    }
    setIsFinalScoreMode(true);
  }, [user_name]);

  return (
    <div
      className={sty.BanfanRadar}
      style={isAndroid ? { "--size": "100vw" } : {}}
    >
      {savedImgDataURL ? (
        <img src={savedImgDataURL} alt={gameName} className={sty.img__saved} />
      ) : (
        <div ref={refContainer} className={sty.container}>
          {imgUrlGameCover && (
            <BgBlurCanvas
              width={containerWidth}
              height={containerHeight}
              imageUrl={imgUrlGameCover}
            />
          )}
          {imgUrlGameCover && (
            <img className={sty.img__cover} src={imgUrlGameCover} alt="" />
          )}
          <ThreeRadarChart
            {...args}
            className={cx(sty.ThreeRadarChart, {
              [sty.ThreeRadarChart__disable]: isFinalScoreMode,
            })}
            data={data}
            onChangeInputLabel={onChangeInputLabel}
            onChangeValue={onChangeValue}
            isTriggerSaveImage={isTriggerSaveImage}
            onCompleteSaveImage={onCompleteSaveImage}
            handleDeleteDataItem={deleteDataItem}
            spriteMaterialColor={spriteMaterialColor}
            editMaxValue={maxValue}
            {...radarStyles}
          />
          {imgUrlGameCover && (
            <FanSlider
              name={gameName}
              coverImg={imgUrlGameCover}
              isOpen={isFinalScoreMode}
              user_name={user_name}
              point={point}
              setPoint={setPoint}
              unLockMaxValueLimit={unLockMaxValueLimit}
            />
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {!isSaveImageMode &&
          (isFinalScoreMode ? (
            <>
              <button
                className={cx(sty.btn, sty.btn__back)}
                // onClick={() => setIsFinalScoreMode(false)}
                onClick={() => setIsFinalScoreMode(false)}
              >
                返回編輯
              </button>
              <button
                className={cx(sty.btn, sty.btn__save_img, {
                  [sty.btn__fadeIn]: !!point,
                })}
                onClick={saveImage}
              >
                圖片儲存
              </button>
            </>
          ) : (
            <>
              {maxLengthData > data.length && (
                <button
                  className={cx(sty.btn, sty.btn__add)}
                  onClick={addDataItem}
                >
                  ＋1維度
                </button>
              )}
              <button
                className={cx(sty.btn, sty.btn__confirm_radar)}
                onClick={completeExperience}
              >
                確認體驗
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

BanFanRadarContainer.propTypes = {};

export default BanFanRadarContainer;
