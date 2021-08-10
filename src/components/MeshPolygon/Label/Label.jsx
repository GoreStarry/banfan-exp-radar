import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import shallow from "zustand/shallow";

import useStore from "../../../store/useStore.js";
import SpriteText from "../../SpriteText";

import EditLabel from "../EditLabel";

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
  handleDeleteDataItem,
  isDeleteAble,
  editBarColor,
  editBarHeight,
  editDotSize,
  editDotColor,
  editMainColor,
  editMarker,
  editFontColor,
  editMaxValue,
  editStep,
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
      setTimeout(() => {
        setIsEditModes(true);
      }, 30);
      setTimeout(() => {
        refInput.current?.input?.focus();
      }, 500);
      useStore.setState({
        focusPointIndex: index.toString(),
      });
    }
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
    <EditLabel
      ref={refInput}
      position={position}
      value={value}
      onChangeValue={onChangeValue}
      onChangeInputLabel={onChangeInputLabel}
      index={index}
      text={text}
      handleCloseEdit={handleCloseEdit}
      handleEnterKeyDown={handleEnterKeyDown}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      handleDeleteDataItem={handleDeleteDataItem}
      isDeleteAble={isDeleteAble}
      editBarColor={editBarColor}
      editBarHeight={editBarHeight}
      editDotSize={editDotSize}
      editDotColor={editDotColor}
      editMainColor={editMainColor}
      editFontColor={editFontColor}
      editMarker={editMarker}
      editMaxValue={editMaxValue}
      editStep={editStep}
    />
  ) : (
    <SpriteText
      className={sty.SpriteText}
      onClick={onClickLabel}
      onPointerDown={onClickLabel}
      key={`sprite-${text}`}
      position={position}
      color={color}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      onPointerOver={setCanvasCursor}
      onPointerLeave={setCanvasCursorAsDefault}
      {...restProps}
    >
      {text || "？？"}
    </SpriteText>
  );
};

Label.propTypes = {};

export default Label;
