import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../Label";

const Labels = React.memo(
  ({
    data,
    points,
    textAlignList,
    verticalAlignList,
    // mode,
    // onChangeInputLabel,
    // labelMode,
    // color,
    // setCanvasCursor,
    // setCanvasCursorAsDefault,
    ...restProps
  }) => {
    // console.log(points, labelList);
    return data.map(({ name, value }, index) => {
      return (
        <Label
          key={index}
          index={index}
          position={[points[index].x, points[index].y, 0]}
          text={name}
          value={value}
          textAlign={textAlignList[index]}
          verticalAlign={verticalAlignList[index]}
          isLastLabel={data.length === index + 1}
          {...restProps}
        />
      );
    });
  }
);

Labels.propTypes = {};

export default Labels;
