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
import useObjectFit from "react-use-object-fit";
import { AutoTextSize } from "auto-text-size";
import cx from "classnames";

import sty from "./FanSlider.module.scss";
import FanIcon from "./FanIcon";
import { useDrag } from "react-use-gesture";
import imgLogo from "./images/logo.png";

const {
  utils: { pipe, clamp, mapRange, snap },
} = gsap;

const FanSlider = ({
  isOpen,
  name,
  minValue = 0,
  maxValue = 5,
  user_name,
  point,
  setPoint,
  coverImg,
  unLockMaxValueLimit,
}) => {
  const refFanSliderBox = useRef();
  const refInitialX = useRef(0);
  const refTimeline = useRef();
  const isRefAlreadyEdit = useRef(false);
  const refCoverCanvas = useRef();

  const refCoverContainer = useRef();

  const refIsFadeInDone = useRef(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const [springFanSlider, setSpringFanSlider] = useSpring(
    () => ({ x: isOpen ? "0%" : "-110%" }),
    [isOpen]
  );

  const {
    width: coverWidth,
    height: coverHeight,
    ratio,
    offsetX,
    offsetY,
    imgWidth,
    imgHeight,
  } = useObjectFit({
    type: "cover",
    imgUrl: coverImg,
    container: { ref: refCoverContainer.current && refCoverContainer },
  });

  useEffect(() => {
    if (coverWidth && coverHeight) {
      const ctx = refCoverCanvas.current.getContext("2d");
      // ctx.filter = `blur(${width * 0.02}px)`; // safari not support

      let img = new Image();
      img.crossOrigin = "anonymous";

      var resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = coverWidth;
      resizedCanvas.height = coverHeight;

      img.onload = () => {
        ctx.drawImage(img, 0, 0, coverWidth, coverHeight);
      };
      img.src = coverImg;
    }
    return () => {};
  }, [coverWidth, coverHeight]);

  const handleChangePoint = useCallback((val) => {
    if (refIsFadeInDone.current) {
      if (refTimeline.current) {
        isRefAlreadyEdit.current = true;
        refTimeline.current.clear();
        gsap.set(".FanIcon", { opacity: 1 });
        gsap.timeline().to("#hint", { opacity: 0, yPercent: -100 });
      }
      setPoint(val);
    }
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
          y: "-150%",
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
          onStart: () => {
            refIsFadeInDone.current = true;
            setIsAnimationDone(true);
          },
        },
        "start+=1.5"
      )
      .fromTo(
        "#hint",
        {
          opacity: 0,
          yPercent: 50,
        },
        {
          opacity: 1,
          yPercent: 0,
        },
        "start+=1"
      );
  }, []);

  useEffect(() => {
    if (isOpen && !point && !isRefAlreadyEdit.current) {
      refIsFadeInDone.current = false;
      animateIn();
    } else {
      setIsAnimationDone(false);
    }
    return () => {
      refTimeline.current && refTimeline.current.kill();
    };
  }, [isOpen, point]);

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

  const isCHT = useMemo(() => name.match(/[\u4E00-\u9FFF]/) && true, [name]);

  const vmin = useMemo(() => {
    return window.innerWidth > window.innerHeight
      ? window.innerHeight / 100
      : window.innerWidth / 100;
  }, []);

  return (
    <>
      <header className={sty.header}>
        <img
          className={sty.img__logo}
          src={imgLogo}
          alt="桌遊拌飯"
          onClick={unLockMaxValueLimit}
        />
        <h1
          className={cx(sty.h1, {
            [sty.h1__cht]: isCHT,
          })}
        >
          <AutoTextSize maxFontSizePx={5.8 * vmin}>{name}</AutoTextSize>
        </h1>
      </header>

      <div ref={refCoverContainer} className={sty.container__cover}>
        {/* <img
          className={sty.img__cover}
          style={{ width: coverWidth, height: coverHeight }}
          src={coverImg}
          alt={name}
        /> */}
        <canvas
          ref={refCoverCanvas}
          width={coverWidth}
          height={coverHeight}
          className={sty.img__cover}
        />
      </div>
      <div
        className={sty.FanSlider}
        style={{ pointerEvents: isOpen ? "initial" : "none" }}
      >
        <div className={sty.container__slider}>
          <a.div
            style={springFanSlider}
            ref={refFanSliderBox}
            className={sty.box__fans}
            {...bind()}
          >
            {[...Array(5)].map((nulll, index) => (
              <FanIcon
                key={index}
                index={index}
                point={point}
                setPoint={handleChangePoint}
                isAnimationDone={isAnimationDone}
              />
            ))}
          </a.div>
          {isOpen && !!point && (
            <span className={sty.span__point}>{` /  ${point}`}</span>
          )}
        </div>
        <div id="hint" className={sty.bubble}>
          你給幾碗飯！
        </div>
        <h3 className={sty.h3}>
          {user_name ? <span>{`${user_name} `}</span> : "我"}的體驗雷達
        </h3>
      </div>
    </>
  );
};

FanSlider.propTypes = {};

export default FanSlider;
