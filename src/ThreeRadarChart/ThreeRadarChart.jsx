import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";
import canvasToImage from "canvas-to-image";
import _ from "lodash";
import cx from "classnames";

import useStore from "../store/useStore.js";

import BgClickOut from "../components/BgClickOut";
import AbilityPlate from "../components/AbilityPlate";
import BgRadarChart from "../components/BgRadarChart";
import Camera from "../components/Camera";

import sty from "./ThreeRadarChart.module.scss";

const ThreeRadarChart = ({
  className,
  centerPoint = [0, 0, 0],
  lengthRadius = 1,
  maxValue = 5,
  data = [
    { name: "我齁", value: 5 },
    { name: "美術", value: 3 },
    { name: "測試試", value: 0.5 },
    { name: "創意", value: 3 },
    { name: "耐玩", value: 5 },
    { name: "策略", value: 1 },
  ],
  control = true,
  isTriggerSaveImage,
  onCompleteSaveImage,
  nameSavedImage,
  children,
  canvasBgColor = "#fffdfa",
  fontColor = "black",
  textHeight = 0.3,
  textStrokeWidth = 1,
  // textStrokeColor = "#fc5603",
  textStrokeColor = "white",
  outlineColor = "#fc5603",
  centerOutLineColor,
  abilityPlateBgColor = "#aac3e0",
  abilityPlateColor = "red",
  offsetY = 0.2,
  // focusPointIndex = false,
  // isAutoDetectFocusPointIndex = true,
  labelMode = "editable",
  onChangeInputLabel: onChangeInputLabelOrigin,
  onChangeValue,
  handleDeleteDataItem,

  ...restProps
}) => {
  const refCanvas = useRef();
  const refCacheData = useRef();

  const setCanvasCursor = useCallback(() => {
    refCanvas.current.style.cursor = "pointer";
  }, []);
  const setCanvasCursorAsDefault = useCallback(() => {
    refCanvas.current.style.cursor = "default";
  }, []);

  const saveImage = useCallback(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = refCanvas.current.width;
    ctx.canvas.height = refCanvas.current.height;
    ctx.drawImage(refCanvas.current, 0, 0);
    canvasToImage(canvas, nameSavedImage);
  }, []);

  // const autoDetectFocusPointIndex = useMemo(() => {
  //   if (!refCacheData.current) {
  //     refCacheData.current = data;
  //     return false;
  //   }

  //   if (isAutoDetectFocusPointIndex) {
  //     const diffIndex = data.findIndex((item, index) => {
  //       // console.log(Object.keys(difference(item, refCacheData.current[index])));
  //       return (
  //         Object.keys(difference(item, refCacheData.current[index])).length !==
  //         0
  //       );
  //     });
  //     refCacheData.current = data;

  //     return diffIndex === -1 ? false : diffIndex.toString();
  //   } else {
  //     return false;
  //   }
  // }, [data]);

  useEffect(() => {
    if (isTriggerSaveImage) {
      saveImage();
      onCompleteSaveImage();
    }
    return () => {};
  }, [isTriggerSaveImage]);

  const positionAbilityPlate = useMemo(
    () => [
      0,
      0,
      0 + offsetY,
      // 0.15
    ],
    []
  );

  const onChangeInputLabel = useCallback((e) => {
    const {
      value,
      dataset: { index: indexString },
    } = e.target;
    onChangeInputLabelOrigin(value, parseInt(indexString));
  }, []);

  const numAbility = data.length < 3 ? 3 : data.length;
  // console.log(autoDetectFocusPointIndex);
  return (
    <div
      className={cx(sty.ThreeRadarChart, className)}

      // onClick={saveImage}
    >
      <Canvas
        shadows
        key={canvasBgColor}
        alpha
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ camera, gl, scene, viewport }) => {
          gl.setPixelRatio(window.devicePixelRatio || 2);
          refCanvas.current = gl.domElement;
          if (canvasBgColor && canvasBgColor !== "transparent") {
            scene.background = new THREE.Color(canvasBgColor);
          } else {
            scene.background = null;
            gl.setClearColor(0x000000, 0);
          }
        }}
        {...restProps}
      >
        <group
          scale={1.3}
          // rotation={[-Math.PI / 100, -Math.PI / 100, 0]}
        >
          <BgClickOut />

          <BgRadarChart
            data={data}
            numAbility={numAbility}
            numLayer={maxValue}
            color={abilityPlateBgColor}
            outlineColor={outlineColor}
            centerOutLineColor={centerOutLineColor}
            fontColor={fontColor}
            textHeight={textHeight}
            textStrokeWidth={textStrokeWidth}
            textStrokeColor={textStrokeColor}
            offsetY={offsetY}
            lengthRadius={lengthRadius}
            labelMode={labelMode}
            onChangeInputLabel={onChangeInputLabel}
            onChangeValue={onChangeValue}
            labelMode={labelMode}
            setCanvasCursor={setCanvasCursor}
            setCanvasCursorAsDefault={setCanvasCursorAsDefault}
            handleDeleteDataItem={handleDeleteDataItem}
          />
          <AbilityPlate
            data={data}
            maxValue={maxValue}
            color={abilityPlateColor}
            outlineColor={outlineColor}
            position={positionAbilityPlate}
            lengthRadius={lengthRadius}
          />
        </group>
        {children}
        <Camera
          // focusPointIndex={autoDetectFocusPointIndex || focusPointIndex}
          control={control}
          numAbility={numAbility}
          lengthRadius={lengthRadius}
          centerPoint={centerPoint}
        />
        {/* {control && <OrbitControls />} */}
      </Canvas>
    </div>
  );
};

ThreeRadarChart.propTypes = {
  labelMode: PropTypes.oneOf([
    "editable", // auto switch to input if click label
    "edit", // input mode
    "display", // canvas sprite
  ]),
  isTriggerSaveImage: PropTypes.bool,
  onCompleteSaveImage: PropTypes.func,
  nameSavedImage: PropTypes.string,
  maxValue: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  onChangeInputLabel: PropTypes.func,
  canvasBgColor: PropTypes.string,
  fontColor: PropTypes.string,
  outlineColor: PropTypes.string,
  abilityPlateBgColor: PropTypes.string,
  abilityPlateColor: PropTypes.string,
  focusPointIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default ThreeRadarChart;

function difference(object, base) {
  return _.transform(object, (result, value, key) => {
    if (!_.isEqual(value, base[key])) {
      result[key] =
        _.isObject(value) && _.isObject(base[key])
          ? difference(value, base[key])
          : value;
    }
  });
}
