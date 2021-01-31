import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { HTML } from "@react-three/drei";

import MeshPolygon from "../MeshPolygon";

import sty from "./BgRadarChart.module.scss";

const BgRadarChart = ({
  numAbility,
  numLayer = 3,
  backgroundColor = "orange",
  labelList,
}) => {
  return (
    <group>
      <MeshPolygon
        numPolygonSide={numAbility}
        color={backgroundColor}
        isCenterLineDisplay={true}
        labelList={labelList}
      />
      {[...Array(numLayer)].map((nulll, index) => {
        const scaleSize = index / numLayer;
        return (
          <MeshPolygon
            key={"layer" + index}
            isOutlineMode={true}
            isThinLineMode={true}
            numPolygonSide={numAbility}
            scale={[scaleSize, scaleSize, 1]}
          />
        );
      })}
    </group>
  );
};

BgRadarChart.propTypes = {
  labelList: PropTypes.array,
};

export default BgRadarChart;
