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
import { OrbitControls } from "@react-three/drei";
import canvasToImage from "canvas-to-image";

import AbilityPlate from "../components/AbilityPlate";
import BgRadarChart from "../components/BgRadarChart";
import SpriteText from "../components/SpriteText";

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
  ...restProps
}) => {
  const labelList = useMemo(() => data.map(({ name }) => name), [data]);
  const refCanvas = useRef();

  const saveImage = useCallback(() => {
    canvasToImage(refCanvas.current, nameSavedImage);
  }, []);

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

  return (
    <div
      className={sty.ThreeRadarChart}
      // onClick={saveImage}
    >
      <Canvas
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
            numAbility={data.length < 3 ? 3 : data.length}
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
          />
          <AbilityPlate
            data={data}
            maxValue={maxValue}
            color={abilityPlateColor}
            outlineColor={outlineColor}
            position={positionAbilityPlate}
          />
        </group>
        {children}
        {control && <OrbitControls />}
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
};

export default ThreeRadarChart;
