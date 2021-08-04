import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import {
  Stage,
  Container,
  Sprite,
  Text,
  Graphics,
} from "@inlet/react-pixi/legacy";

const CoverPixi = ({ img, containerSize: { width, height }, imgRatio }) => {
  const draw = React.useCallback((g) => {
    g.clear();
    g.lineStyle(2, 0x0000ff, 1);
    g.beginFill(0xff700b, 1);
    g.drawRect(50, 150, 120, 120);
    g.endFill();
  }, []);

  const { imgWidth, imgHeight } = useMemo(() => {
    if (imgRatio > 1) {
      // land
      return {
        imgWidth: width * 0.3,
        imgHeight: (width / imgRatio) * 0.3,
      };
    } else {
      //portrait
      return {
        imgWidth: width * imgRatio * 0.3,
        imgHeight: width * 0.3,
      };
    }
  }, [imgRatio, width, height]);

  return (
    <>
      <Sprite
        image={img}
        // scale={{ x: 0.5, y: 0.5 }}
        width={imgWidth}
        height={imgHeight}
        anchor={[0, 0]}
        x={width * 0.05}
        y={width * 0.05}
      />
      <Graphics draw={draw} />
    </>
  );
};

CoverPixi.propTypes = {};

export default CoverPixi;
