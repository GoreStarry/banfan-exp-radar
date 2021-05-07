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
  data,
  numAbility,
  numLayer = 3,
  color,
  fontColor,
  textHeight,
  textStrokeWidth,
  textStrokeColor,
  outlineColor,
  centerOutLineColor,
  offsetY,
  lengthRadius,
  labelMode,
  onChangeInputLabel,
  onChangeValue,
  setCanvasCursor,
  setCanvasCursorAsDefault,
  handleDeleteDataItem,
}) => {
  return (
    <group>
      <MeshPolygon
        data={data}
        numPolygonSide={numAbility}
        color={color}
        isCenterLineDisplay={true}
        fontColor={fontColor}
        textHeight={textHeight}
        textStrokeWidth={textStrokeWidth}
        textStrokeColor={textStrokeColor}
        outlineColor={outlineColor}
        centerOutLineColor={centerOutLineColor}
        offsetY={offsetY}
        lengthRadius={lengthRadius}
        labelMode={labelMode}
        onChangeInputLabel={onChangeInputLabel}
        onChangeValue={onChangeValue}
        setCanvasCursor={setCanvasCursor}
        setCanvasCursorAsDefault={setCanvasCursorAsDefault}
        handleDeleteDataItem={handleDeleteDataItem}
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
              (offsetY / (numLayer - 1)) * (numLayer - index) * 1.6,
            ]}
            outlineColor={outlineColor}
            lengthRadius={lengthRadius}
          />
        );
      })}
    </group>
  );
};

BgRadarChart.propTypes = {};

export default BgRadarChart;
