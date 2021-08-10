import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as THREE from "three";

import MeshPolygon from "../MeshPolygon";

import sty from "./BgRadarChart.module.scss";

const BgRadarChart = ({
  data,
  numAbility,
  numLayer = 3,
  color,
  fontColor,
  spriteMaterialColor,
  textHeight,
  textStrokeWidth,
  textStrokeColor,
  outlineColor,
  outOutlineStrokeWidth,
  centerOutLineColor,
  offsetY,
  lengthRadius,
  labelMode,
  onChangeInputLabel,
  onChangeValue,
  setCanvasCursor,
  setCanvasCursorAsDefault,
  handleDeleteDataItem,
  editBarColor,
  editBarHeight,
  editDotSize,
  editDotColor,
  editMainColor,
  editMarker,
  editFontColor,
  editMaxValue,
  editStep,
}) => {
  return (
    <group>
      <MeshPolygon
        data={data}
        numPolygonSide={numAbility}
        color={color}
        isCenterLineDisplay={true}
        fontColor={fontColor}
        spriteMaterialColor={spriteMaterialColor}
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
        blending={THREE.AdditiveBlending}
        isThinLineMode={false}
        outOutlineStrokeWidth={outOutlineStrokeWidth}
        editBarColor={editBarColor}
        editBarHeight={editBarHeight}
        editDotSize={editDotSize}
        editDotColor={editDotColor}
        editMainColor={editMainColor}
        editMarker={editMarker}
        editFontColor={editFontColor}
        editMaxValue={editMaxValue}
        editStep={editStep}
      />
      <group>
        {[...Array(numLayer)].map((nulll, index) => {
          const scaleSize = index / numLayer;

          return (
            <MeshPolygon
              key={"layer" + index}
              color={index % 2 ? "#4c5c70" : "#37414e"}
              blending={
                index % 2 ? THREE.MultiplyBlending : THREE.AdditiveBlending
              }
              isThinLineMode={false}
              outOutlineStrokeWidth={outOutlineStrokeWidth}
              numPolygonSide={numAbility}
              scale={[scaleSize, scaleSize, 1]}
              position={[0, 0, (offsetY / (numLayer - 1)) * (numLayer - index)]}
              outlineColor={outlineColor}
              lengthRadius={lengthRadius}
            />
          );
        })}
      </group>
    </group>
  );
};

BgRadarChart.propTypes = {};

export default BgRadarChart;
