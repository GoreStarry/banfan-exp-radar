import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { a, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import gsap from "gsap";
import cx from "classnames";

import sty from "./SpringSlider.module.scss";

const {
  utils: { pipe, clamp, mapRange, snap, splitColor },
} = gsap;

const SpringSlider = ({
  className,
  barColor = "red",
  barHeight = "5px",
  dotSize = "2.2rem",
  dotColor = "white",
  mainColor = "#aac3e0",
  value = 0,
  minValue = 0,
  maxValue = 5,
  step = 0.1,
  onChange,
  index,
}) => {
  const refBar = useRef();

  const snapValue = useCallback(snap(step), []);
  const barUnActiveColor = useMemo(
    () => `rgba(${[...splitColor(barColor), 0.3]})`,
    [barColor]
  );

  const [thumbDotSpringProps, setThumbDotSpring] = useSpring(
    () => ({
      x: 0,
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      setThumbDotSpring({
        immediate: true,
        x: mapRange(minValue, maxValue, 0, refBar.current.offsetWidth, value),
      });
    }, 30);
    return () => {};
  }, []);

  const [markSpringProps, setMarkSpring] = useSpring(() => {
    return { scale: mapRange(minValue, maxValue, 0, 3.5, value) };
  }, [value]);

  const bind = useDrag(
    (state) => {
      const {
        movement: [mx],
        event,
        // down,
        // swipe, // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
        // tap, // is the drag assimilated to a tap
      } = state;

      event.preventDefault();
      event.stopPropagation();

      const barWidth = refBar.current.offsetWidth;

      const clampValue = clamp(0, barWidth, mx);

      // console.log(clampValue);

      onChange(
        snapValue(mapRange(0, barWidth, minValue, maxValue, clampValue)),
        index
      );
      setThumbDotSpring(() => {
        return {
          x: clampValue,
        };
      });
    },
    { axis: "x", initial: () => [thumbDotSpringProps.x.get(), 0] }
  );

  return (
    <div
      className={cx(sty.SpringSlider, className)}
      style={{
        "--dot-size": dotSize,
        "--dot-color": dotColor,
        "--bar-color": barColor,
        "--bar-height": barHeight,
        "--label-color": mainColor,
      }}
    >
      <div
        ref={refBar}
        className={sty.bar}
        style={{ background: barUnActiveColor }}
      >
        <a.div
          className={sty.bar_active}
          style={{ width: thumbDotSpringProps.x }}
        ></a.div>
        <a.div
          {...bind()}
          className={sty.dot__container}
          style={thumbDotSpringProps}
        >
          <a.div style={markSpringProps} className={sty.box__marker}>
            <div className={sty.marker}>🍚</div>
          </a.div>
          <div className={sty.label__value}>{value}</div>
          <div className={sty.dot_thumb}></div>
        </a.div>
      </div>
    </div>
  );
};

SpringSlider.propTypes = {
  barColor: PropTypes.string,
  barHeight: PropTypes.string,
  dotSize: PropTypes.string,
  dotColor: PropTypes.string,
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

export default SpringSlider;
