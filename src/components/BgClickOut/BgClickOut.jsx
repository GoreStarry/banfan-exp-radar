import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import useStore from "../../store/useStore";

const BgClickOut = React.memo(({}) => {
  const handleClickOut = useCallback(() => {
    const { isOnEditLabel } = useStore.getState();
    isOnEditLabel &&
      useStore.setState({
        isClickOutLabel: true,
      });
  }, []);

  return (
    <group
      onPointerDown={handleClickOut} // prevent slider over drag
    >
      <mesh position={[0, 0, -20]} rotation-y={Math.PI / 4}>
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0}
          depthTest={false}
        />
        <planeBufferGeometry args={[1000, 1000]} />
      </mesh>
      <mesh position={[0, 0, -20]} rotation-y={-Math.PI / 4}>
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0}
          depthTest={false}
        />
        <planeBufferGeometry args={[1000, 1000]} />
      </mesh>
    </group>
  );
});

BgClickOut.propTypes = {};

export default BgClickOut;
