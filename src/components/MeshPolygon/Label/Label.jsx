import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";
import AutosizeInput from "react-input-autosize";
import shallow from "zustand/shallow";

import useStore from "../../../store/useStore.js";
import SpriteText from "../../SpriteText";

import {
  handlePointerOverIn,
  handlePointerOverOut,
} from "../../../helpers/threePointerCursor.js";
import sty from "./Label.module.scss";

const Label = ({
  position,
  text,
  textAlign,
  verticalAlign,
  onChangeInputLabel,
  labelMode,
  color,
  mode,
  index,
  setCanvasCursor,
  setCanvasCursorAsDefault,
  isLastLabel,
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
      }, 10);
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
    <Html center distanceFactor={10} position={position}>
      <AutosizeInput
        ref={refInput}
        className={sty.label}
        defaultValue={text}
        data-index={index}
        onChange={onChangeInputLabel}
        onBlur={handleCloseEdit}
        onKeyDown={handleEnterKeyDown}
        onClick={onClickAutosizeInput}
      />
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
      {text || "尚未輸入"}
    </SpriteText>
  );
};

Label.propTypes = {};

export default Label;
