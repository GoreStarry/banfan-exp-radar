import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";
import AutosizeInput from "react-input-autosize";
import shallow from "zustand/shallow";

import useStore from "../../../store/useStore.js";
import SpriteText from "../../SpriteText";
import SpringSlider from "../../SpringSlider";

import sty from "./Label.module.scss";
import { stubTrue } from "lodash-es";

const Label = ({
  position,
  text,
  value,
  textAlign,
  verticalAlign,
  onChangeInputLabel,
  onChangeValue,
  labelMode,
  color,
  mode,
  index,
  setCanvasCursor,
  setCanvasCursorAsDefault,
  isLastLabel,
  distanceFactor = 10,

  ...restProps
}) => {
  const [isEditMode, setIsEditMode] = useState(mode === "edit");
  const refInput = useRef();
  const [isAutosizeInputMount, setIsAutosizeInputMount] = useState(false);

  const { isClickOutLabel } = useStore(
    useCallback(
      (state) => ({
        isClickOutLabel: state.isClickOutLabel,
      }),
      []
    ),
    shallow
  );

  const setIsEditModes = useCallback((bool) => {
    setIsEditMode(bool);
    useStore.setState({ isOnEditLabel: bool });
  }, []);

  useEffect(() => {
    // console.log(isEditMode, isClickOutLabel, isLastLabel);
    if (isEditMode && isClickOutLabel) {
      setIsEditModes(false);
      useStore.setState({ isClickOutLabel: false });
    } else if (isLastLabel) {
      useStore.setState({ isClickOutLabel: false });
    }
  }, [isClickOutLabel, isEditMode]);

  const onClickLabel = useCallback((e) => {
    e.stopPropagation();
    if (mode === "editable") {
      setIsEditModes(true);
      setTimeout(() => {
        // refInput.current.input.focus();
        refInput.current.focus();
      }, 30);
      useStore.setState({
        focusPointIndex: index.toString(),
      });
    }
  }, []);

  const handleCloseEdit = useCallback(() => {
    if (mode === "editable") {
      setIsEditModes(false);
    }
  }, []);

  const handleEnterKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      handleCloseEdit();

      useStore.setState({ isResetCamera: true });
    }
  }, []);

  const onClickAutosizeInput = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setCanvasCursorAsDefault();
      setTimeout(() => {
        setIsAutosizeInputMount(true);
      }, 0);
    } else {
      setIsAutosizeInputMount(false);
    }
    return () => {};
  }, [isEditMode]);

  return isEditMode ? (
    <Html
      center
      // distanceFactor={distanceFactor}
      position={position}
    >
      <div className={sty.container__edit}>
        <div className={sty.container_slider}>
          <SpringSlider
            value={value}
            onChange={onChangeValue}
            index={index}

            // scaleContainer={distanceFactor}
          />
        </div>
        <AutosizeInput
          ref={refInput}
          className={sty.AutosizeInput}
          defaultValue={text}
          data-index={index}
          onChange={onChangeInputLabel}
          // onBlur={handleCloseEdit}
          onKeyDown={handleEnterKeyDown}
          onClick={onClickAutosizeInput}
        />
      </div>
    </Html>
  ) : (
    <SpriteText
      className={sty.SpriteText}
      onClick={onClickLabel}
      key={`sprite-${text}`}
      position={position}
      color={color}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      onPointerOver={setCanvasCursor}
      onPointerLeave={setCanvasCursorAsDefault}
      {...restProps}
    >
      {text || "？？？"}
    </SpriteText>
  );
};

Label.propTypes = {};

export default Label;
