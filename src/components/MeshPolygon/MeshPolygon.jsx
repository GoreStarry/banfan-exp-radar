import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { HTML } from "@react-three/drei";
import Two from "two.js";

import CusLine from "../CusLine";

import sty from "../BgRadarChart/BgRadarChart.module.scss";

const MeshPolygon = ({
  centerPoint = [0, 0, 0],
  numPolygonSide,
  lengthRadius = 1,
  color = "aqua",

  isCenterLineDisplay = false,

  isOutlineMode = false,
  outlineColor = "black",
  centerLineColor = outlineColor,
  outOutlineStrokeWidth = 1,
  isOutlineDashMode = false,
  isThinLineMode = true,
  labelList,
  ...restProps
}) => {
  const twoPolygon = useMemo(() => {
    const twoPolygon = new Two.Polygon(
      centerPoint.x,
      centerPoint.y,
      lengthRadius,
      numPolygonSide
    );
    return twoPolygon;
  }, [numPolygonSide, lengthRadius]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.autoClose = true;
    twoPolygon._collection.forEach(({ x, y }, index) => {
      const target = [centerPoint[0] + x, centerPoint[1] + y];
      index === 0 ? shape.moveTo(...target) : shape.lineTo(...target);
    });

    return shape;
  }, [twoPolygon]);

  const points = useMemo(() => {
    return shape.getPoints();
  }, [shape]);

  return (
    shape && (
      <group {...restProps}>
        <group rotation={[0, 0, -Math.PI / numPolygonSide]}>
          {!isOutlineMode && (
            <mesh>
              <shapeBufferGeometry args={[shape]} />
              <meshBasicMaterial color={color} />
              {/* <meshPhongMaterial color="red" side={THREE.DoubleSide} /> */}
            </mesh>
          )}

          <CusLine
            color={outlineColor}
            points={points}
            lineWidth={outOutlineStrokeWidth}
            isThinLineMode={isThinLineMode}
          />

          {isCenterLineDisplay &&
            points.map((endPoint, index) => {
              const newPoints = [
                { x: centerPoint[0], y: centerPoint[1], z: centerPoint[2] },
                endPoint,
              ];

              return (
                <>
                  <CusLine
                    key={`center-${index}`}
                    points={newPoints}
                    isThinLineMode={true}
                    color={centerLineColor}
                  />
                  <HTML center position={[endPoint.x, endPoint.y, endPoint.z]}>
                    <div className={sty.label}>{labelList[index]}</div>
                  </HTML>
                </>
              );
            })}
        </group>
      </group>
    )
  );
};

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
