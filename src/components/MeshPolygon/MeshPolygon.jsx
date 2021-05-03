import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import Two from "two.js";

import rotatePoint from "../../utils/rotatePoint.js";
import CusLine from "../CusLine";
import CenterLines from "./CenterLines";
import SpriteText from "../SpriteText";
import Labels from "./Labels";

// import sty from "../BgRadarChart/BgRadarChart.module.scss";

const MeshPolygon = React.memo(
  ({
    centerPoint = [0, 0, 0],
    numPolygonSide,
    lengthRadius = 1,
    color,

    isCenterLineDisplay = false,

    isOutlineMode = false,
    outlineColor,
    centerOutLineColor,
    outOutlineStrokeWidth = 1,
    isOutlineDashMode = false,
    isThinLineMode = true,
    labelList,
    fontColor,
    textHeight,
    textStrokeWidth,
    textStrokeColor,
    labelMode,
    onChangeInputLabel,
    offsetY,
    setCanvasCursor,
    setCanvasCursorAsDefault,
    ...restProps
  }) => {
    const twoPolygon = useMemo(() => {
      const twoPolygon = new Two.Polygon(
        centerPoint[0],
        centerPoint[1],
        lengthRadius,
        numPolygonSide
      );
      return twoPolygon;
    }, [numPolygonSide, lengthRadius]);

    const shape = useMemo(() => {
      const shape = new THREE.Shape();
      shape.autoClose = true;

      twoPolygon._collection.forEach(({ x, y }, index) => {
        const [xRotated, yRotate] = rotatePoint(
          centerPoint[0],
          centerPoint[1],
          x,
          y,
          180 / numPolygonSide
        );

        const target = [xRotated, yRotate];
        index === 0 ? shape.moveTo(...target) : shape.lineTo(...target);
      });

      return shape;
    }, [twoPolygon]);

    const points = useMemo(() => {
      return shape.getPoints();
    }, [shape]);

    const [textAlignList, verticalAlignList] = useMemo(() => {
      const centerIndex =
        (points.length - 2) / // 2 is extra points
        2;

      return [
        points.map((nulll, index) =>
          index === 0 || index === centerIndex
            ? "center"
            : index < centerIndex
            ? "right"
            : "left"
        ),
        points.map((nulll, index) =>
          index === 0 ? "bottom" : index === centerIndex ? "top" : "center"
        ),
      ];
    }, [points]);

    return (
      shape && (
        <group {...restProps}>
          {!isOutlineMode && (
            <mesh>
              <shapeBufferGeometry args={[shape]} />
              <meshBasicMaterial
                color={color}
                side={THREE.DoubleSide}
                transparent={true}
                blending={THREE.MultiplyBlending}
              />
            </mesh>
          )}

          <CusLine
            color={outlineColor}
            points={points}
            lineWidth={outOutlineStrokeWidth}
            isThinLineMode={isThinLineMode}
          />

          {isCenterLineDisplay && (
            <CenterLines
              points={points}
              centerPoint={centerPoint}
              offsetY={offsetY}
              color={centerOutLineColor || outlineColor}
            />
          )}

          {isCenterLineDisplay && (
            <Labels
              points={points}
              color={fontColor}
              textHeight={textHeight}
              strokeWidth={textStrokeWidth}
              strokeColor={textStrokeColor}
              textAlignList={textAlignList}
              verticalAlignList={verticalAlignList}
              labelList={labelList}
              mode={labelMode}
              onChangeInputLabel={onChangeInputLabel}
              setCanvasCursor={setCanvasCursor}
              setCanvasCursorAsDefault={setCanvasCursorAsDefault}
            />
          )}
        </group>
      )
    );
  }
);

MeshPolygon.propTypes = {
  centerPoint: PropTypes.array,
  isOutlineMode: PropTypes.bool,
  isCenterLineDisplay: PropTypes.bool,
  numPolygonSide: PropTypes.number,
  isOutlineDashMode: PropTypes.bool,
  isThinLineMode: PropTypes.bool,
  lengthRadius: PropTypes.number,
  labelList: PropTypes.array,
  renderExtendComponent: PropTypes.func,
};

export default MeshPolygon;
