import React, { useRef, useState, useCallback, useEffect } from "react";
import cx from "classnames";
import { getBggThing } from "bgg-xml-api-client";
import { useWindowSize } from "react-use";
import useStore from "../store/useStore";
import BanfanPixiUI from "../components/BanfanPixiUI";

import ThreeRadarChart from "./ThreeRadarChart.jsx";
import FanSlider from "../components/FanSlider";

import sty from "./test.module.scss";
import "css-reset-and-normalize/css/reset-and-normalize.min.css";
import "css-reset-and-normalize/css/button-reset.min.css";
import imgLogo from "./images/logo.png";
import imgBrass from "./images/game/brass.jpg";

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
  const [isFinalScoreMode, setIsFinalScoreMode] = useState(true);
  const [radarStyles, setRadarStyles] = useState({
    scale: 1.25,
    position: [0.95, 0.8, 0],
  });
  const refPixiCanvas = useRef();

  useEffect(() => {
    if (isFinalScoreMode) {
      useStore.setState({
        isClickOutLabel: true,
        isResetCamera: true,
      });
      setRadarStyles({ scale: 1.25, position: [0.95, 0.8, 0] });
    } else {
      setRadarStyles({ scale: 1.3, position: [0, -0.5, 0] });
    }
    return () => {};
  }, [isFinalScoreMode]);

  const { width: winWidth, height: winHeight } = useWindowSize();
  const maxLengthData = 8;

  const [bggGameCover, setBggGameCover] = useState();
  const [drawImageList, setDrawImageList] = useState([]);

  useEffect(() => {
    const { offsetWidth: width, offsetHeight: height } = refContainer.current;
    setDrawImageList([
      {
        src: imgBrass,
        x: width * 0.05,
        y: height * 0.05,
        width: width * 0.3,
        height: height * 0.3,
      },
      {
        src: imgLogo,
        x: width * 0.325,
        y: height * 0.9,
        width: width * 0.35,
        height: height * 0.1,
      },
    ]);
    return () => {};
  }, [winWidth, winHeight]);

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
    // setRadarStyles({
    //   scale: 1.3,
    //   position: [0, -0.5, 0],
    // });

    setIsTriggerSaveImage(true);
  }, []);

  const onCompleteSaveImage = useCallback(() => {
    setIsTriggerSaveImage(false);
  }, []);

  return (
    <div ref={refContainer} className={sty.container}>
      {imgBrass && <img className={sty.img__cover} src={imgBrass} alt="" />}
      <img className={sty.img__logo} src={imgLogo} alt="" />
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
        drawImageList={drawImageList}
        refAdditionalDrawCanvas={refPixiCanvas}
        drawBorderLineColor="#aac3e0"
        drawBorderLineWidthPercent={0.05}
        {...radarStyles}
      />
      {isFinalScoreMode ? (
        <>
          <button
            className={cx(sty.btn, sty.btn__save_img)}
            onClick={saveImage}
          >
            圖片儲存
          </button>
          <button
            className={cx(sty.btn, sty.btn__confirm_radar)}
            onClick={() => setIsFinalScoreMode(false)}
          >
            返回
          </button>
          <FanSlider name="工業革命：伯明翰" />
          <BanfanPixiUI refCanvas={refPixiCanvas} />
        </>
      ) : (
        <>
          {maxLengthData > data.length && (
            <button className={cx(sty.btn, sty.btn__add)} onClick={addDataItem}>
              ＋1維度
            </button>
          )}
          <button
            className={cx(sty.btn, sty.btn__confirm_radar)}
            onClick={() => setIsFinalScoreMode(true)}
          >
            確認體驗
          </button>
        </>
      )}
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
  ],
};
