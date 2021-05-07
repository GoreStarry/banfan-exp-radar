import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";
import AutosizeInput from "react-input-autosize";
import shallow from "zustand/shallow";

import SpringSlider from "../../SpringSlider";
import sty from "./EditLabel.module.scss";
import useStore from "../../../store/useStore.js";

const translateMap = {
  top: "100%",
  bottom: "-50%",
  center: "0%",
  left: "50%",
  right: "-50%",
};

const EditLabel = React.forwardRef(
  (
    {
      position,
      value,
      onChangeValue,
      onChangeInputLabel,
      index,
      text,
      handleCloseEdit,
      handleEnterKeyDown,
      textAlign, // left, right, center
      verticalAlign, // top, bottom, center
      handleDeleteDataItem,
      isDeleteAble,
    },
    ref
  ) => {
    const refIsMount = useRef(false);
    const { focusPointIndex } = useStore(
      useCallback(
        (state) => ({
          focusPointIndex: state.focusPointIndex,
        }),
        []
      ),
      shallow
    );

    useEffect(() => {
      if (refIsMount.current && focusPointIndex !== index) {
        handleCloseEdit();
      } else {
        refIsMount.current = true;
      }
      return () => {};
    }, [focusPointIndex]);

    const onClickAutosizeInput = useCallback((e) => {
      e.stopPropagation();
    }, []);

    return (
      <Html
        center
        // distanceFactor={distanceFactor}
        position={position}
      >
        <div
          className={sty.container__edit}
          style={{
            transform: `translate(${translateMap[textAlign]},${translateMap[verticalAlign]})`,
          }}
        >
          <div className={sty.container_slider}>
            <SpringSlider
              value={value}
              onChange={onChangeValue}
              index={index}

              // scaleContainer={distanceFactor}
            />
          </div>
          <div className={sty.container__inputs}>
            {isDeleteAble && (
              <button
                className={sty.btn__delete}
                data-index={index}
                onClick={handleDeleteDataItem}
              >
                −
              </button>
            )}
            <AutosizeInput
              ref={ref}
              className={sty.AutosizeInput}
              defaultValue={text}
              data-index={index}
              onChange={onChangeInputLabel}
              // onBlur={handleCloseEdit}
              onKeyDown={handleEnterKeyDown}
              onClick={onClickAutosizeInput}
              onPointerDown={onClickAutosizeInput}
            />
          </div>
        </div>
      </Html>
    );
  }
);

EditLabel.propTypes = {};

export default EditLabel;
