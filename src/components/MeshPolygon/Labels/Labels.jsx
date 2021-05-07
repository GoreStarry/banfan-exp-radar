import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../Label";

const Labels = React.memo(
  ({
    data,
    points,
    textAlignList,
    verticalAlignList,
    // handleDeleteDataItem
    // mode,
    // onChangeInputLabel,
    // labelMode,
    // color,
    // setCanvasCursor,
    // setCanvasCursorAsDefault,
    handleDeleteDataItem,
    ...restProps
  }) => {
    const handleDeleteData = useCallback((e) => {
      handleDeleteDataItem(parseInt(e.target.dataset.index));
    }, []);
    // console.log(points, labelList);
    return data.map(({ name, value }, index) => {
      return (
        <Label
          key={index}
          index={index}
          position={[points[index].x, points[index].y, 0.1]}
          text={name}
          value={value}
          textAlign={textAlignList[index]}
          verticalAlign={verticalAlignList[index]}
          isLastLabel={data.length === index + 1}
          handleDeleteDataItem={handleDeleteData}
          isDeleteAble={data.length > 3}
          {...restProps}
        />
      );
    });
  }
);

Labels.propTypes = {};

export default Labels;
