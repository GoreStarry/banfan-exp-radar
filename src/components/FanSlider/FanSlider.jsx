import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

import sty from "./FanSlider.module.scss";
import FanIcon from "./FanIcon";
import { useDrag } from "react-use-gesture";

const {
  utils: { pipe, clamp, mapRange, snap },
} = gsap;

const FanSlider = ({ name, minValue = 0, maxValue = 5 }) => {
  const [point, setPoint] = useState(0);
  const refInitialX = useRef(0);

  const snapValue = useCallback(snap(0.1), []);

  const refFanSlider = useRef();

  useEffect(() => {
    refInitialX.current =
      (refFanSlider.current?.offsetWidth / maxValue) * point;
    return () => {};
  }, [point]);

  const bind = useDrag(
    (state) => {
      const {
        // movement: [mx],
        // offset: [ox, oy],
        delta: [dx, dy],
        event,
        down,
        // swipe, // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
        // tap, // is the drag assimilated to a tap
      } = state;

      if (!down) return;
      event.preventDefault();
      event.stopPropagation();

      const barWidth = refFanSlider.current.offsetWidth;
      const clampValue = clamp(0, barWidth, refInitialX.current + dx);

      setPoint(
        snapValue(mapRange(0, barWidth, minValue, maxValue, clampValue))
      );
    },
    {
      axis: "x",
      // initial: [initialX, 0],
      // bounds: { left: 0, right: refFanSlider.current?.offsetWidth },
    }
  );

  return (
    <div className={sty.FanSlider}>
      <div className={sty.banner}>
        <h2>{name}</h2>
        <h1>我配 {point || "？"} 碗飯！</h1>
      </div>
      <div ref={refFanSlider} className={sty.box__fans} {...bind()}>
        {[...Array(5)].map((nulll, index) => (
          <FanIcon
            key={index}
            index={index}
            point={point}
            setPoint={setPoint}
          />
        ))}
      </div>
    </div>
  );
};

FanSlider.propTypes = {};

export default FanSlider;
