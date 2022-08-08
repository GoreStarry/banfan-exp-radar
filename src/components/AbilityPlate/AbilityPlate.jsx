import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useSprings } from "@react-spring/three";

import sty from "./AbilityPlate.module.scss";
import { useSetState } from "react-use";

import CusLine from "../CusLine";

const AbilityPlate = React.memo(
  ({
    data,
    maxValue,
    color = "red",
    outlineColor,
    lengthRadius,
    ...restProps
  }) => {
    const refShapeFactor = useRef();
    const refShapePoints = useRef(
      [...Array(data.length)].map(() => ({ x: 0, y: 0, z: 0 }))
    );

    const [shape, setShape] = useState(null);
    const [outlinePoints, setOutlinePoints] = useState();

    const [springsPosition, setSpringsPosition] = useSprings(
      data.length,
      (index) => ({
        x: 0,
        y: 0,
        onChange: ({ value: { x, y } }) => {
          refShapePoints.current[index] = { x, y };

          data.forEach((nulll, indexPoint) => {
            const { x = 0, y = 0 } = refShapePoints.current[indexPoint] || {};

            if (indexPoint === 0) {
              refShapeFactor.current = new THREE.Shape();
              refShapeFactor.current.autoClose = true;
              refShapeFactor.current.moveTo(x, y);
            } else {
              refShapeFactor.current.lineTo(x, y);
            }

            if (indexPoint + 1 === data.length) {
              setShape(refShapeFactor.current);

              setOutlinePoints([
                ...refShapePoints.current,
                refShapePoints.current[0],
              ]);
            }
          });
        },
      }),
      [data.length]
    );

    const animateTransition = useCallback(
      (data) => {
        const numAbility = data.length;
        const basicAngle = (Math.PI * 2) / numAbility;
        setSpringsPosition((index) => {
          const targetAngle = basicAngle * index;
          const targetValue = data[index].value / maxValue;

          return {
            delay: index * 80,
            x: lengthRadius * 0.93 * targetValue * Math.cos(targetAngle),
            y: lengthRadius * 0.93 * targetValue * Math.sin(targetAngle),
          };
        });
      },
      [setSpringsPosition]
    );

    useEffect(() => {
      if (refShapePoints.current.length > data.length) {
        refShapePoints.current.length = data.length;
      }
      animateTransition(data);
      return () => {};
    }, [data, animateTransition]);

    // const handleClick = useCallback(() => {
    //   setSpringsPosition(() => {
    //     return {
    //       x: 0,
    //       y: 0,
    //       onRest: () => {
    //         setTimeout(() => {
    //           animateTransition(data);
    //         }, 300);
    //       },
    //     };
    //   });
    // }, [data]);

    return (
      <group
        {...restProps}
        // onClick={handleClick} onPointerDown={handleClick}
      >
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            {shape && <shapeBufferGeometry args={[shape]} />}
            <meshBasicMaterial
              side={THREE.DoubleSide}
              color={color}
              transparent={true}
              blending={THREE.MultiplyBlending}
            />
          </mesh>
          <mesh>
            {shape && <shapeBufferGeometry args={[shape]} />}
            <meshBasicMaterial
              side={THREE.DoubleSide}
              color={color}
              transparent={true}
              blending={THREE.AdditiveBlending}
              // wireframe
            />
            <CusLine
              points={outlinePoints}
              color="rgba(0, 168, 255, 0.5)"
              lineWidth={3}
              transparent={true}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </group>
    );
  }
);

AbilityPlate.propTypes = {};

export default AbilityPlate;
