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
      [...Array(data.length)].map(() => ({ x: 0, y: 0 }))
    );

    const [shape, setShape] = useState(null);

    const [springsPosition, setSpringsPosition] = useSprings(
      data.length,
      (index) => ({
        x: 0,
        y: 0,
        onChange: () => {
          const x = springsPosition[index].x.get();
          const y = springsPosition[index].y.get();
          refShapePoints.current[index].x = x;
          refShapePoints.current[index].y = y;

          refShapePoints.current.forEach(({ x, y }, indexPoint) => {
            if (indexPoint === 0) {
              refShapeFactor.current = new THREE.Shape();
              refShapeFactor.current.autoClose = true;
              refShapeFactor.current.moveTo(x, y);
            } else {
              refShapeFactor.current.lineTo(x, y);
            }

            if (indexPoint + 1 === data.length) {
              setShape(refShapeFactor.current);
            }
          });
        },
      })
    );

    const animateTransition = useCallback((data) => {
      const numAbility = data.length;
      const basicAngle = (Math.PI * 2) / numAbility;
      setSpringsPosition((index) => {
        const targetAngle = basicAngle * index;
        const targetValue = data[index].value / maxValue;

        return {
          delay: index * 80,
          x: lengthRadius * targetValue * Math.cos(targetAngle),
          y: lengthRadius * targetValue * Math.sin(targetAngle),
        };
      });
    }, []);

    useEffect(() => {
      animateTransition(data);
      return () => {};
    }, [data]);

    const handleClick = useCallback(() => {
      setSpringsPosition(() => {
        return {
          x: 0,
          y: 0,
          onRest: () => {
            setTimeout(() => {
              animateTransition(data);
            }, 300);
          },
        };
      });
    }, [data]);

    return (
      <group {...restProps} onClick={handleClick}>
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
        </group>
      </group>
    );
  }
);

AbilityPlate.propTypes = {};

export default AbilityPlate;
