import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { a, useSpring } from "react-spring";

import sty from "./FanSlider.module.scss";
import FanIcon from "./FanIcon";
import { useDrag } from "react-use-gesture";

const {
  utils: { pipe, clamp, mapRange, snap },
} = gsap;

const FanSlider = ({ isOpen, name, minValue = 0, maxValue = 5 }) => {
  const [point, setPoint] = useState(0);

  const refFanSliderBox = useRef();
  const refInitialX = useRef(0);
  const refTimeline = useRef();
  const [springFanSlider, setSpringFanSlider] = useSpring(
    () => ({ x: isOpen ? "0%" : "-110%" }),
    [isOpen]
  );

  const handleChangePoint = useCallback((val) => {
    refTimeline.current &&
      refTimeline.current.clear().set(".FanIcon", { clearProps: "opacity" });
    setPoint(val);
  }, []);

  const snapValue = useCallback(snap(0.1), []);

  const animateIn = useCallback(() => {
    refTimeline.current = gsap
      .timeline()
      .addLabel("start", "0.5")
      .fromTo(
        ".FanIcon",
        {
          // opacity: 0,
          y: "-510%",
        },
        {
          // opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "bounce.out",
        },
        "start"
      )
      .fromTo(
        ".FanIcon",
        {
          scaleY: 1,
          transformOrigin: "center bottom",
        },
        {
          duration: 0.1,
          scaleY: 0.7,
          stagger: { amount: 0.1, repeat: 1, yoyo: true },

          ease: "power2.out",
        },
        "start+=0.025"
      )
      .fromTo(
        ".FanIcon",
        {
          opacity: 1,
        },
        {
          opacity: 0.3,
          duration: 1,
          stagger: { amount: 0.4, repeat: -1, yoyo: true },
          ease: "power1.out",
        },
        "start+=1.5"
      );
  }, []);

  useEffect(() => {
    if (isOpen) {
      animateIn();
    }
    return () => {
      refTimeline.current && refTimeline.current.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    refInitialX.current =
      (refFanSliderBox.current?.offsetWidth / maxValue) * point;
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

      const barWidth = refFanSliderBox.current.offsetWidth;
      const clampValue = clamp(0, barWidth, refInitialX.current + dx);

      handleChangePoint(
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
    <a.div style={springFanSlider} className={sty.FanSlider}>
      <div className={sty.banner}>
        <h2>{name}</h2>
        <h1>我配 {point || <span>☟</span>} 碗飯！</h1>
      </div>
      <div ref={refFanSliderBox} className={sty.box__fans} {...bind()}>
        {[...Array(5)].map((nulll, index) => (
          <FanIcon
            key={index}
            index={index}
            point={point}
            setPoint={handleChangePoint}
          />
        ))}
      </div>
    </a.div>
  );
};

FanSlider.propTypes = {};

export default FanSlider;
