import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Line } from "@react-three/drei";

const CusLine = ({
  isThinLineMode,
  color,
  points = [{ x: 1, y: 1, z: 1 }],
  isOutlineDashMode,
  lineWidth = 1,
  ...restProps
}) => {
  const onUpdate = useCallback(
    (self) =>
      self.setFromPoints(
        points
        // points.map(({ x, y, z }) => ({ x, y, z: z + 0.1 }))
      ),
    [points]
  );

  return isThinLineMode ? (
    <line>
      <bufferGeometry onUpdate={onUpdate} />
      <lineBasicMaterial color={color} />
    </line>
  ) : (
    <Line
      points={points.map(({ x, y, z = 0 }) => [x, y, z])} // Array of points
      color={color} // Default
      lineWidth={lineWidth} // In pixels (default)
      dashed={isOutlineDashMode} // Default
      {...restProps}
    />
  );
};

CusLine.propTypes = {};

export default CusLine;
