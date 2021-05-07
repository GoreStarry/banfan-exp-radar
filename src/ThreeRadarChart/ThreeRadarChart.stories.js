import React, { useState, useCallback, useEffect } from "react";
import cx from "classnames";
import { getBggThing } from "bgg-xml-api-client";

import ThreeRadarChart from "./ThreeRadarChart.jsx";

import sty from "./test.module.scss";
import "css-reset-and-normalize/css/reset-and-normalize.min.css";
import "css-reset-and-normalize/css/button-reset.min.css";
import imgLogo from "./images/logo.png";

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
  const [data, setData] = useState(dataInit);
  const [isTriggerSaveImage, setIsTriggerSaveImage] = useState(false);
  const maxLengthData = 8;

  const [bggGameCover, setBggGameCover] = useState();
  const [drawImageList, setDrawImageList] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await getBggThing({ id: "224517" });
      setBggGameCover(data.item.image);
      setDrawImageList([
        {
          src: data.item.image,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    return () => {};
  }, []);

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
      return [...prevData, { name: "", value: 0 }];
    });
  }, []);

  const saveImage = useCallback(() => {
    setIsTriggerSaveImage(true);
  }, []);

  const onCompleteSaveImage = useCallback(() => {
    setIsTriggerSaveImage(false);
  }, []);

  return (
    <div className={sty.container}>
      {bggGameCover && (
        <img className={sty.img__cover} src={bggGameCover} alt="" />
      )}
      <button className={cx(sty.btn, sty.btn__save_img)} onClick={saveImage}>
        圖片儲存
      </button>
      {maxLengthData > data.length && (
        <button className={cx(sty.btn, sty.btn__add)} onClick={addDataItem}>
          ＋1維度
        </button>
      )}
      <img className={sty.img__logo} src={imgLogo} alt="" />
      <ThreeRadarChart
        {...args}
        className={sty.ThreeRadarChart}
        data={data}
        onChangeInputLabel={onChangeInputLabel}
        onChangeValue={onChangeValue}
        isTriggerSaveImage={isTriggerSaveImage}
        onCompleteSaveImage={onCompleteSaveImage}
        handleDeleteDataItem={deleteDataItem}
        drawImageList={drawImageList}
      />
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
