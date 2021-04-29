import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { Canvas } from "react-three-fiber";
// import * as THREE from "three";
import canvasToImage from "canvas-to-image";
import _ from "lodash";
// import { OrbitControls } from "@react-three/drei/OrbitControls";

import AbilityPlate from "../components/AbilityPlate";
import BgRadarChart from "../components/BgRadarChart";
import SpriteText from "../components/SpriteText";
import Camera from "../components/Camera";

import sty from "./ThreeRadarChart.module.scss";

const ThreeRadarChart = ({
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
  canvasBgColor = "white",
  fontColor = "#222222",
  textHeight = 0.3,
  textStrokeWidth = 0.3,
  textStrokeColor = "#fc5603",
  outlineColor = "#fc5603",
  centerOutLineColor,
  abilityPlateBgColor = "#aac3e0",
  abilityPlateColor = "red",
  offsetY = 0.3,
  focusPointIndex = false,
  isAutoDetectFocusPointIndex = true,

  ...restProps
}) => {
  const labelList = useMemo(() => data.map(({ name }) => name), [data]);
  const refCanvas = useRef();
  const refCacheData = useRef();

  const saveImage = useCallback(() => {
    canvasToImage(refCanvas.current, nameSavedImage);
  }, []);

  const autoDetectFocusPointIndex = useMemo(() => {
    if (!refCacheData.current) {
      refCacheData.current = data;
      return false;
    }

    if (isAutoDetectFocusPointIndex) {
      const diffIndex = data.findIndex((item, index) => {
        console.log(Object.keys(difference(item, refCacheData.current[index])));
        return (
          Object.keys(difference(item, refCacheData.current[index])).length !==
          0
        );
      });
      refCacheData.current = data;

      return diffIndex === -1 ? false : diffIndex;
    } else {
      return false;
    }
  }, [data]);

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

  const numAbility = data.length < 3 ? 3 : data.length;
  console.log(autoDetectFocusPointIndex);
  return (
    <div
      className={sty.ThreeRadarChart}
      // onClick={saveImage}
    >
      <Canvas
        //  shadows
        key={canvasBgColor}
        width="300px"
        height="300px"
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ camera, gl, scene, viewport }) => {
          gl.setPixelRatio(window.devicePixelRatio || 2);
          refCanvas.current = gl.domElement;
          scene.background = canvasBgColor && new THREE.Color(canvasBgColor);
        }}
        {...restProps}
      >
        <SpriteText position={(0, 0, 0)} color="red">
          123
        </SpriteText>
        <group rotation={[-Math.PI / 100, -Math.PI / 100, 0]}>
          <BgRadarChart
            numAbility={numAbility}
            numLayer={maxValue}
            color={abilityPlateBgColor}
            outlineColor={outlineColor}
            centerOutLineColor={centerOutLineColor}
            fontColor={fontColor}
            textHeight={textHeight}
            textStrokeWidth={textStrokeWidth}
            textStrokeColor={textStrokeColor}
            labelList={labelList}
            offsetY={offsetY}
            lengthRadius={lengthRadius}
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
          focusPointIndex={autoDetectFocusPointIndex || focusPointIndex}
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
