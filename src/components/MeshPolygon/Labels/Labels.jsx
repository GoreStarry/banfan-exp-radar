import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../Label";

const Labels = React.memo(
  ({
    points,
    textAlignList,
    verticalAlignList,
    labelList,
    // mode,
    // onChangeInputLabel,
    // labelMode,
    // color,
    // setCanvasCursor,
    // setCanvasCursorAsDefault,
    ...restProps
  }) => {
    // console.log(points, labelList);
    return labelList.map((labelText, index) => {
      return (
        <Label
          key={index}
          index={index}
          position={[points[index].x, points[index].y, 0]}
          text={labelText}
          textAlign={textAlignList[index]}
          verticalAlign={verticalAlignList[index]}
          isLastLabel={labelList.length === index + 1}
          {...restProps}
        />
      );
    });
  }
);

Labels.propTypes = {};

export default Labels;
