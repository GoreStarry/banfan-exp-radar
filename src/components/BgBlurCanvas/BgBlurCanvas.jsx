import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import useObjectFit from "react-use-object-fit";
import * as StackBlur from "stackblur-canvas";

import sty from "./BgBlurCanvas.module.scss";

const BgBlurCanvas = ({
  imageUrl,
  width: containerWidth,
  height: containerHeight,
}) => {
  const ref = useRef();
  const {
    width,
    height,
    ratio,
    offsetX,
    offsetY,
    imgWidth,
    imgHeight,
  } = useObjectFit({
    type: "cover",
    imgUrl: imageUrl,
    container: { width: containerWidth, height: containerHeight },
  });

  useEffect(() => {
    if (width && height) {
      const ctx = ref.current.getContext("2d");
      // ctx.filter = `blur(${width * 0.02}px)`; // safari not support

      let img = new Image();
      img.crossOrigin = "anonymous";

      var resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = width;
      resizedCanvas.height = height;

      img.onload = () => {
        ctx.drawImage(img, 0 + offsetX, 0 + offsetY, width, height);
        StackBlur.canvasRGB(
          ref.current,
          0,
          0,
          width,
          height,
          width * 0.02,
          false
        );
      };
      img.src = imageUrl;
    }
    return () => {};
  }, [width, height, offsetX, offsetY]);

  return containerHeight ? (
    <canvas
      ref={ref}
      width={containerWidth}
      height={containerHeight}
      className={sty.BgBlurCanvas}
    ></canvas>
  ) : null;
};

BgBlurCanvas.propTypes = {};

export default BgBlurCanvas;
