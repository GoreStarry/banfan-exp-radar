import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Stage, Container, Sprite, Text } from "@inlet/react-pixi/legacy";
import useResizeContainerSize from "./useResizeContainerSize.js";

import sty from "./BanfanPixiUI.module.scss";

const BanfanPixiUI = ({ refCanvas }) => {
  const refContainer = useRef();
  const [isMount, setIsMount] = useState(false);
  const { width, height } = useResizeContainerSize(refContainer);

  useEffect(() => {
    setIsMount(true);
    setTimeout(() => {
      console.log(refCanvas);
    }, 5000);
    return () => {};
  }, []);

  return (
    <div ref={refContainer} className={sty.BanfanPixiUI}>
      <Stage
        ref={refCanvas}
        width={width}
        height={height}
        options={{ backgroundAlpha: 0, forceCanvas: true }}
      >
        {/* <Sprite image="./my-image.png" x={100} y={100} /> */}

        <Container x={width / 2}>
          <Text text="Hello World" />
        </Container>
        <Sprite
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png"
          // scale={{ x: 0.5, y: 0.5 }}
          width={width / 2}
          height={height / 2}
          anchor={[-0.5, 0]}
          x={0}
          y={0}
        />
      </Stage>
    </div>
  );
};

BanfanPixiUI.propTypes = {};

export default BanfanPixiUI;
