import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import SpriteText from "../../SpriteText";

const Labels = React.memo(
  ({
    points,
    color,
    textAlignList,
    verticalAlignList,
    labelList,
    ...restProps
  }) => {
    return points.map((endPoint, index) => {
      return (
        labelList[index] && (
          <SpriteText
            key={labelList[index]}
            position={[endPoint.x, endPoint.y, endPoint.z]}
            color={color}
            textAlign={textAlignList[index]}
            verticalAlign={verticalAlignList[index]}
            {...restProps}
          >
            {labelList[index]}
          </SpriteText>
        )
      );
    });
  }
);

Labels.propTypes = {};

export default Labels;
