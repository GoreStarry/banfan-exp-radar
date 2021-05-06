import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useSpring } from "react-spring/three";

export default function useResetCamera({
  defaultPosition = [0, 1, 0],
  refControls,
  refCamera,
}) {
  const [, setSpringCam] = useSpring({ position: defaultPosition }, []);

  const resetCamSpring = (resetPosition = defaultPosition) => {
    setSpringCam({
      from: {
        position: [
          refCamera.current.position.x,
          refCamera.current.position.y,
          refCamera.current.position.z,
        ],
      },
      to: { position: resetPosition },
      onChange: ({ value: { position } }) => {
        refCamera.current.position.set(...position);
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
