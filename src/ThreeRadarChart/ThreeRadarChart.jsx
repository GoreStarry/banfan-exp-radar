import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Canvas, useThree } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import AbilityPlate from "../components/AbilityPlate";
import BgRadarChart from "../components/BgRadarChart";

import sty from "./ThreeRadarChart.module.scss";

const ThreeRadarChart = ({
  centerPoint = [0, 0, 0],
  lengthRadius = 1,
  maxValue = 5,
  data = [
    { name: "帶入感", value: 5 },
    { name: "美術", value: 3 },
    { name: "溝通", value: 0.5 },
    { name: "創意", value: 3 },
    { name: "耐玩", value: 5 },
    { name: "策略", value: 1 },
  ],
  numLayer = data.length,
  control,

  ...restProps
}) => {
  const labelList = useMemo(() => data.map(({ name }) => name), [data]);

  return (
    <div className={sty.ThreeRadarChart}>
      <Canvas
        onCreated={({ camera, gl, scene }) => {
          gl.setPixelRatio(window.devicePixelRatio || 2);
          scene.background = new THREE.Color(0xffffff);
        }}
        {...restProps}
      >
        <group rotation={[-Math.PI / 5, -Math.PI / 5, 0]}>
          <BgRadarChart
            numAbility={data.length < 3 ? 3 : data.length}
            numLayer={numLayer}
            labelList={labelList}
          />
          <AbilityPlate
            data={data}
            maxValue={maxValue}
            position={[0, 0, 0.15]}
          />
        </group>
        {control && <OrbitControls />}
      </Canvas>
    </div>
  );
};

ThreeRadarChart.propTypes = {
  maxValue: PropTypes.number,
  data: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
  }),
};

export default ThreeRadarChart;
