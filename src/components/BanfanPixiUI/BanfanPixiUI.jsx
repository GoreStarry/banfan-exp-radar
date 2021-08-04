import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Stage, Container, Sprite, Text } from "@inlet/react-pixi/legacy";
import useResizeContainerSize from "./useResizeContainerSize.js";
import CoverPixi from "./CoverPixi";
import useObjectfit from "react-use-object-fit";
import html2canvas from "html2canvas";

import imgLogo from "./images/logo.png";

import imgBrass from "./images/game/brass.jpg";

import sty from "./BanfanPixiUI.module.scss";

const BanfanPixiUI = ({ refCanvas, imgCover = imgBrass }) => {
  const refContainer = useRef();
  const [isMount, setIsMount] = useState(false);
  const containerSize = useResizeContainerSize(refContainer);

  useEffect(() => {
    setIsMount(true);
    return () => {};
  }, []);

  return (
    <div ref={refContainer} className={sty.BanfanPixiUI}>
      <Stage
        ref={refCanvas}
        width={containerSize.width}
        height={containerSize.height}
        options={{ backgroundAlpha: 0, forceCanvas: true }}
      >
        {/* <Sprite image="./my-image.png" x={100} y={100} /> */}

        {/* <Container x={width / 2}>
          <Text text="Hello World" />
        </Container> */}
        <CoverPixi img={imgLogo} containerSize={containerSize} />
        {/* <Sprite
          image={imgBrass}
          // scale={{ x: 0.5, y: 0.5 }}
          width={width * 0.3}
          height={height * 0.3}
          anchor={[0, 0]}
          x={width * 0.05}
          y={width * 0.05}
        /> */}
      </Stage>
    </div>
  );
};

BanfanPixiUI.propTypes = {};

export default BanfanPixiUI;
