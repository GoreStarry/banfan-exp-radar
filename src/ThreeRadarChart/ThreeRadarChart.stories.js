import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import cx from "classnames";
import { getBggThing } from "bgg-xml-api-client";
import { useStateValidator, useWindowSize } from "react-use";
import useStore from "../store/useStore";
import html2canvas from "html2canvas";
import canvasToImage from "canvas-to-image";
import { isIOS } from "react-device-detect";
import * as THREE from "three";

import useResizeContainerSize from "../hooks/useResizeContainerSize";

// import html2pdf from "html2pdf.js";

import ThreeRadarChart from "./ThreeRadarChart.jsx";
import FanSlider from "../components/FanSlider";
import BgBlurCanvas from "../components/BgBlurCanvas";

import sty from "./test.module.scss";
import "css-reset-and-normalize/css/reset-and-normalize.min.css";
import "css-reset-and-normalize/css/button-reset.min.css";

import imgBrass from "./images/game/pic3727516.webp";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Example/Radar Chart",
  component: ThreeRadarChart,
  argTypes: {
    canvasBgColor: { control: "color" },
    data: { control: { type: "object" } },
    fontColor: { control: "color" },
    textHeight: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    textStrokeWidth: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
    textStrokeColor: { control: "color" },
    outlineColor: { control: "color" },
    centerOutLineColor: { control: "color" },
    abilityPlateBgColor: { control: "color" },
    abilityPlateColor: { control: "color" },
    offsetY: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    control: { table: { disable: true } },
    isTriggerSaveImage: { table: { disable: true } },
    onCompleteSaveImage: { table: { disable: true } },
    nameSavedImage: { table: { disable: true } },
  },
};

const Template = ({ data: dataInit, ...args }) => {
  const refContainer = useRef();
  const [data, setData] = useState(dataInit);
  const [isTriggerSaveImage, setIsTriggerSaveImage] = useState(false);
  const [isFinalScoreMode, setIsFinalScoreMode] = useState(false);
  const [user_name, setUserName] = useState("");
  const [point, setPoint] = useState(0);

  const radarPositionMap = useMemo(
    () => ({
      3: { scale: 1.5, finScale: 1.65, position: [0, -0.8, 0] },
      4: { scale: 1.35, finScale: 1.45, position: [0, -0.3, 0] },
      5: { scale: 1.35, finScale: 1.45, position: [0, -0.5, 0] },
      6: { scale: 1.35, finScale: 1.45, position: [0, -0.3, 0] },
      7: { scale: 1.35, finScale: 1.45, position: [0, -0.5, 0] },
      8: { scale: 1.35, finScale: 1.45, position: [0, -0.3, 0] },
    }),
    []
  );

  const [radarStyles, setRadarStyles] = useState({
    scale: radarPositionMap[data?.length]?.scale,
    position: radarPositionMap[data?.length]?.position,
  });

  const {
    width: containerWidth,
    height: containerHeight,
  } = useResizeContainerSize(refContainer);
  const spriteMaterialColor = useMemo(() => new THREE.Color(10, 10, 10), []);

  const [maxValue, setMaxValue] = useState(5);
  const unLockMaxValueLimit = useCallback(() => {
    setMaxValue(10);
  }, []);
  // const [isMount, setIsMount] = useState(false);

  // useEffect(() => {
  //   setIsMount(true);
  //   return () => {};
  // }, []);

  useEffect(() => {
    const { position, scale } = radarPositionMap[data.length];
    console.log(position);
    setRadarStyles({
      scale,
      position,
    });
    return () => {};
  }, [data.length]);

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

  // const { width: winWidth, height: winHeight } = useWindowSize();
  const maxLengthData = 6;

  // const [bggGameCover, setBggGameCover] = useState();
  // const [drawImageList, setDrawImageList] = useState([]);

  // useEffect(() => {
  //   const { offsetWidth: width, offsetHeight: height } = refContainer.current;
  //   setDrawImageList([
  //     {
  //       src: imgBrass,
  //       x: width * 0.05,
  //       y: height * 0.05,
  //       width: width * 0.3,
  //       height: height * 0.3,
  //     },
  //     {
  //       src: imgLogo,
  //       x: width * 0.325,
  //       y: height * 0.9,
  //       width: width * 0.35,
  //       height: height * 0.1,
  //     },
  //   ]);
  //   return () => {};
  // }, [winWidth, winHeight]);

  // useEffect(async () => {
  //   try {
  //     const { data } = await getBggThing({ id: "224517" });
  //     setBggGameCover(data.item.image);

  //     const { offsetWidth: width, offsetHeight: height } = refContainer.current;
  //     setDrawImageList([
  //       {
  //         src: imgBrass,
  //         x: width * 0.05,
  //         y: height * 0.05,
  //         width: width * 0.3,
  //         height: height * 0.3,
  //       },
  //       {
  //         src: imgLogo,
  //         x: width * 0.325,
  //         y: height * 0.9,
  //         width: width * 0.35,
  //         height: height * 0.1,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   return () => {};
  // }, []);

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
    setData((prevData) => {
      return [...prevData, { name: "", value: 0.5 }];
    });
  }, []);

  const saveImage = useCallback(() => {
    console.log(refContainer.current);
    html2canvas(refContainer.current, { scale: 2 }).then(function (canvas) {
      // document.body.appendChild(canvas);
      if (isIOS) {
        window.location.href = canvas.toDataURL("image/jpeg", 1.0);
      } else {
        canvasToImage(canvas, {
          name: "myImage",
          type: "jpg",
          quality: 1,
        });
      }
    });
    // html2pdf(refContainer.current);

    // setIsTriggerSaveImage(true);
  }, []);

  const onCompleteSaveImage = useCallback(() => {
    setIsTriggerSaveImage(false);
  }, []);

  const completeExperience = useCallback(() => {
    let name;
    if (!user_name) {
      name = prompt("暱稱：(選填)", user_name);
      setUserName(name);
    }
    setIsFinalScoreMode(true);
  }, [user_name]);

  return (
    <div className={sty.BanfanRadar}>
      <div ref={refContainer} className={sty.container}>
        <BgBlurCanvas
          width={containerWidth}
          height={containerHeight}
          imageUrl={imgBrass}
        />
        {imgBrass && <img className={sty.img__cover} src={imgBrass} alt="" />}
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
        <FanSlider
          name="帝國曙光 第4版"
          coverImg={imgBrass}
          isOpen={isFinalScoreMode}
          user_name={user_name}
          point={point}
          setPoint={setPoint}
          unLockMaxValueLimit={unLockMaxValueLimit}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {isFinalScoreMode ? (
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
        )}
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  // primary: true,
  // canvasBgColor: "transparent",

  data: [
    { name: "美術", value: 3 },
    { name: "創意", value: 3 },
    { name: "策略", value: 1 },
    // { name: "策略", value: 1 },
    // { name: "策略", value: 1 },
    // { name: "策略", value: 1 },
    // { name: "策略", value: 1 },
    // { name: "策略", value: 1 },
  ],
};
