import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

export default function useResetCamera({
  defaultPosition = [0, 1, 0],
  defaultCameraLookAtPosition,
  refControls,
  refCamera,
}) {
  const [, setSpringCam] = useSpring(
    { position: defaultPosition, lookAtPosition: defaultCameraLookAtPosition },
    []
  );

  const resetCamSpring = (
    resetPosition = defaultPosition,
    lookAtPosition = defaultCameraLookAtPosition
  ) => {
    setSpringCam({
      from: {
        position: [
          refCamera.current.position.x,
          refCamera.current.position.y,
          refCamera.current.position.z,
        ],
        // lookAtPosition: defaultCameraLookAtPosition,
      },
      to: { position: resetPosition, lookAtPosition },
      onChange: ({ value: { position, lookAtPosition } }) => {
        refCamera.current.position.set(...position);
        refControls.current.target = new THREE.Vector3(...lookAtPosition);
        refControls.current.update();
      },
      onStart: () => {
        // refControls.current.enabled = false;
      },
      onRest: () => {
        // refControls.current.enabled = true;
      },
    });
  };

  return resetCamSpring;
}
