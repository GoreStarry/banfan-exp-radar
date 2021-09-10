import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { Canvas, useThree, extend } from "@react-three/fiber";
// import * as THREE from "three";
import cx from "classnames";
import { a, useSpring } from "react-spring/three";
// import { Effects } from "@react-three/drei";
// import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
// import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

// import useStore from "../store/useStore.js";

import BgClickOut from "../components/BgClickOut";
import AbilityPlate from "../components/AbilityPlate";
import BgRadarChart from "../components/BgRadarChart";
import Camera from "../components/Camera";

import sty from "./ThreeRadarChart.module.scss";

// extend({ ShaderPass });

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
  nameSavedImage,
  children,
  canvasBgColor = "transparent",
  fontColor = "white",
  spriteMaterialColor, // new THREE.Color( 2, 2, 2 ); https://stackoverflow.com/questions/38517862/white-sprite-material
  textHeight = 0.22,
  textStrokeWidth = 0,
  textStrokeColor = "white",
  outlineColor = "#aac3e0",
  outOutlineStrokeWidth = 1.2,
  centerOutLineColor,
  abilityPlateBgColor = "#313b47",
  abilityPlateColor = "#2E5E79",
  offsetY = 0.15,
  // focusPointIndex = false,
  // isAutoDetectFocusPointIndex = true,
  labelMode = "editable",
  onChangeInputLabel: onChangeInputLabelOrigin,
  onChangeValue,
  handleDeleteDataItem,
  scale = 1.3,
  position = [0, -0.5, 0],
  rotation = [0, 0, 0],
  editBarColor = "#35ffff",
  editBarHeight,
  editDotSize,
  editDotColor,
  editMainColor = "#313b47",
  editMarker,
  editFontColor = "white",
  editMaxValue,
  editStep,

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

  const [springStyleRadarGroup, setRadarGroupSpring] = useSpring(
    () => ({
      scale,
      position,
      rotation,
      config: { mass: 2, tension: 150 },
    }),
    [scale, position, rotation]
  );

  const positionAbilityPlate = useMemo(
    () => [
      0,
      0,
      0 + offsetY * 1.3 + 0.001,
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
          gl.setPixelRatio(window.devicePixelRatio * 2 || 2);
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
        <a.group {...springStyleRadarGroup}>
          {/* <lightProbe intensity={1} /> */}
          <spotLight
            color={0xffffff}
            intensity={1}
            position={[0, 20, -80]}
            angle={Math.PI / 1.2}
          />
          <BgClickOut />
          <BgRadarChart
            data={data}
            numAbility={numAbility}
            numLayer={maxValue}
            color={abilityPlateBgColor}
            outlineColor={outlineColor}
            centerOutLineColor={centerOutLineColor}
            outOutlineStrokeWidth={outOutlineStrokeWidth}
            fontColor={fontColor}
            spriteMaterialColor={spriteMaterialColor}
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
            editBarColor={editBarColor}
            editBarHeight={editBarHeight}
            editDotSize={editDotSize}
            editDotColor={editDotColor}
            editMainColor={editMainColor}
            editMarker={editMarker}
            editMaxValue={editMaxValue}
            editStep={editStep}
          />
          <AbilityPlate
            data={data}
            maxValue={maxValue}
            color={abilityPlateColor}
            outlineColor={outlineColor}
            position={positionAbilityPlate}
            lengthRadius={lengthRadius}
          />
        </a.group>
        {children}
        <Camera
          // focusPointIndex={autoDetectFocusPointIndex || focusPointIndex}
          control={control}
          numAbility={numAbility}
          lengthRadius={lengthRadius}
          centerPoint={centerPoint}
        />
        {/* {refCanvas.current && (
          <Effects>
            <shaderPass
              attachArray="passes"
              args={[FXAAShader]}
              material-uniforms-resolution-value={[
                1 / refCanvas.current.width,
                1 / refCanvas.current.height,
              ]}
              renderToScreen
            />
          </Effects>
        )} */}
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
  refAdditionalDrawCanvas: PropTypes.object,
  onChangeInputLabel: PropTypes.func,
  canvasBgColor: PropTypes.string,
  fontColor: PropTypes.string,
  spriteMaterialColor: PropTypes.object,
  outlineColor: PropTypes.string,
  outOutlineStrokeWidth: PropTypes.number,
  abilityPlateBgColor: PropTypes.string,
  abilityPlateColor: PropTypes.string,
  focusPointIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  editBarColor: PropTypes.string,
  editBarHeight: PropTypes.string,
  editDotSize: PropTypes.string, //px
  editDotColor: PropTypes.string,
  editMarker: PropTypes.string,
  editMainColor: PropTypes.string,
  editMaxValue: PropTypes.number, // default 5
  editStep: PropTypes.number, // default 0.1
};

export default ThreeRadarChart;
