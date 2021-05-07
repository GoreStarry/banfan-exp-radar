import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Two from "two.js";
import shallow from "zustand/shallow";

import useStore from "../../store/useStore.js";
import useResetCamera from "./useResetCamera.js";
import rotatePoint from "../../utils/rotatePoint.js";

const Camera = React.memo(
  ({
    maxDistance = 10,
    minDistance = 0,

    isPreloadDone = true,
    control,
    numAbility,
    lengthRadius,
    centerPoint,
    startCameraPosition = [0, 0, 5],
    defaultCameraPosition = [2.5, -2, 4],
    defaultCameraLookAtPosition = [0, 0, 0],
  }) => {
    const refCamera = useRef(null);
    const didMount = useRef(false);
    const refOrbitControls = useRef(null);
    // const defaultCameraPosition = [-8, 8, 6]

    const { isClickOutLabel, isResetCamera, focusPointIndex } = useStore(
      useCallback(
        (state) => ({
          isClickOutLabel: state.isClickOutLabel,
          isResetCamera: state.isResetCamera,
          focusPointIndex: state.focusPointIndex,
        }),
        []
      ),
      shallow
    );

    const resetCamera = useResetCamera({
      defaultPosition: defaultCameraPosition,
      refControls: refOrbitControls,
      defaultCameraLookAtPosition,
      refCamera,
    });

    useEffect(() => {
      if (isClickOutLabel || isResetCamera) {
        resetCamera();
        useStore.setState({
          isResetCamera: false,
          focusPointIndex: false,
        });
      }
      return () => {};
    }, [isClickOutLabel, isResetCamera]);

    useEffect(() => {
      if (isPreloadDone) {
        // refCamera.current.lookAt(0, 2, 0)

        resetCamera();

        setTimeout(() => {
          // setIsLockMaxDistance(true);
        }, 5000);
      }
      return () => {};
    }, [isPreloadDone]);

    const listFocusPointPositionList = useMemo(() => {
      const twoPolygon = new Two.Polygon(
        centerPoint[0],
        centerPoint[1],
        lengthRadius * 3,
        numAbility
      );

      return twoPolygon._collection.map(({ x, y }, index) => {
        return [
          ...rotatePoint(
            centerPoint[0],
            centerPoint[1],
            x,
            y,
            180 / numAbility
          ),
          lengthRadius * 2,
        ];
      });
    }, [numAbility, lengthRadius]);

    useEffect(() => {
      if (!didMount.current) {
        didMount.current = true;
      } else if (focusPointIndex !== false && listFocusPointPositionList) {
        resetCamera(
          listFocusPointPositionList[focusPointIndex],
          focusPointIndex === "0" ? [0, 1, -1] : [0, 0, -1]
        );
      }
      return () => {};
    }, [focusPointIndex, listFocusPointPositionList]);

    return (
      <React.Fragment>
        <PerspectiveCamera
          makeDefault
          ref={refCamera}
          position={startCameraPosition}
          args={[60, window.innerWidth / window.innerHeight, 1, 2000]}
        />
        <OrbitControls
          ref={refOrbitControls}
          enableRotate={control}
          enablePan={control}
          // because use perspectiveCamera so use maxDistance instead of maxZoom
          // maxDistance={isLockMaxDistance ? maxDistance : undefined}
          // minDistance={minDistance}
        />
      </React.Fragment>
    );
  }
);

Camera.propTypes = {
  focusPointIndex: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isPreloadDone: PropTypes.bool,
  numAbility: PropTypes.number,
  // isLoadingDone: PropTypes.bool,
};

export default Camera;
