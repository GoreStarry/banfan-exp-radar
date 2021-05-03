import React, { useState, useCallback } from "react";

import ThreeRadarChart from "./ThreeRadarChart.jsx";

import sty from "./ThreeRadarChart.module.scss";

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

  const onChange = useCallback((e) => {
    const {
      value,
      dataset: { index: indexString },
    } = e.target;
    setData((prevData) => {
      const index = parseInt(indexString);
      // console.log(dataInit);
      // console.log(prevData, index);
      // console.log(index + 1);
      // console.log(prevData.slice(0, index), prevData.slice(index + 1));
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

  const saveImage = useCallback(() => {
    setIsTriggerSaveImage(true);
  }, []);

  const onCompleteSaveImage = useCallback(() => {
    setIsTriggerSaveImage(false);
  }, []);

  return (
    <>
      <button className={sty.btn__save_img} onClick={saveImage}>
        圖片儲存
      </button>
      <ThreeRadarChart
        {...args}
        data={data}
        onChangeInputLabel={onChange}
        isTriggerSaveImage={isTriggerSaveImage}
        onCompleteSaveImage={onCompleteSaveImage}
      />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  // primary: true,
  data: [
    { name: "我齁", value: 5 },
    { name: "美術", value: 3 },
    { name: "測試試", value: 0.5 },
    { name: "創意", value: 3 },
    { name: "耐玩", value: 5 },
    { name: "策略", value: 1 },
  ],
};
