import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import mezr from "mezr";
import gsap from "gsap";
import { useWindowSize } from "react-use";

import imgFanEmpty from "./images/fan-empty.png";
import imgFanFull from "./images/fan-full.png";

import sty from "./FanIcon.module.scss";

const {
  utils: { pipe, clamp, mapRange, snap },
} = gsap;

const FanIcon = ({ index, className, point, setPoint, isAnimationDone }) => {
  const refFanIcon = useRef();
  const refFanIconLeft = useRef();
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isAnimationDone) {
      setTimeout(() => {
        refFanIconLeft.current = mezr.offset(refFanIcon.current).left;
      }, 0);
    }
    return () => {};
  }, [width, height, isAnimationDone]);

  const nowPercentage = useMemo(() => {
    return clamp(index, index + 1, point) - index;
  }, [point]);

  const onClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setPoint(
      index +
        snap(
          0.1,
          (e.clientX - refFanIconLeft.current) / refFanIcon.current.offsetWidth
        )
    );
  }, []);

  return (
    <div
      ref={refFanIcon}
      className={cx("FanIcon", sty.FanIcon, className)}
      onMouseDown={onClick}
      // onTouchStart={onTouchMove}
      // onTouchMove={onTouchMove}
    >
      <img className={sty.img__fan} src={imgFanEmpty} alt="" />
      <div
        className={cx(sty.img__fan, sty.box__overflow)}
        style={{ width: `${nowPercentage * 100}%` }}
      >
        <img src={imgFanFull} alt="" />
      </div>
    </div>
  );
};

FanIcon.propTypes = {};

export default FanIcon;
