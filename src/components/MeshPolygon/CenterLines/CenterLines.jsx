import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import CusLine from "../../CusLine";

const CenterLines = React.memo(({ points, centerPoint, offsetY, color }) => {
  return points.map((endPoint, index) => {
    const newPoints = [
      {
        x: centerPoint[0],
        y: centerPoint[1],
        z: centerPoint[2] + offsetY / 2,
      },
      endPoint,
    ];
    return (
      <CusLine
        key={"line" + index}
        points={newPoints}
        isThinLineMode={true}
        color={color}
      />
    );
  });
});

CenterLines.propTypes = {};

export default CenterLines;
