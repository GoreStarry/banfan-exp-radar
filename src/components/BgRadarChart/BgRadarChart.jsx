import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";

import MeshPolygon from "../MeshPolygon";

import sty from "./BgRadarChart.module.scss";

const BgRadarChart = ({
  numAbility,
  numLayer = 3,
  color,
  fontColor,
  textHeight,
  textStrokeWidth,
  textStrokeColor,
  outlineColor,
  centerOutLineColor,
  labelList,
  offsetY,
  lengthRadius,
}) => {
  return (
    <group>
      <MeshPolygon
        numPolygonSide={numAbility}
        color={color}
        isCenterLineDisplay={true}
        labelList={labelList}
        fontColor={fontColor}
        textHeight={textHeight}
        textStrokeWidth={textStrokeWidth}
        textStrokeColor={textStrokeColor}
        outlineColor={outlineColor}
        centerOutLineColor={centerOutLineColor}
        offsetY={offsetY}
        lengthRadius={lengthRadius}
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
            position={[
              0,
              0,
              (offsetY / (numLayer - 1)) * (numLayer - index) * 1.1,
            ]}
            outlineColor={outlineColor}
            lengthRadius={lengthRadius}
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
