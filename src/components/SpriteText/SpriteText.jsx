import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

const positionYTranslateMap = {
  top: -0.7,
  bottom: 0.7,
  center: 0,
};

const SpriteText = React.memo(
  ({
    children,
    position,
    textHeight = 0.3,
    color = "rgba(255, 255, 255, 1)",
    spriteMaterialColor, // new THREE.Color( 2, 2, 2 ); https://stackoverflow.com/questions/38517862/white-sprite-material
    backgroundColor,
    padding = 0,
    borderWidth = 0,
    borderRadius = 0,
    borderColor = "white",
    strokeWidth = 0.3,
    strokeColor = "#fc5603",
    fontFace = "Arial",
    fontSize = 90, // defines text resolutio,
    fontWeight = "normal",
    textAlign = "center",
    verticalAlign = "center",
    ...restProps
  }) => {
    const text = children;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const border = Array.isArray(borderWidth)
      ? borderWidth
      : [borderWidth, borderWidth]; // x,y border
    const relBorder = border.map((b) => b * fontSize * 0.1); // border in canvas units

    const borderRadiusArray = Array.isArray(borderRadius)
      ? borderRadius
      : [borderRadius, borderRadius, borderRadius, borderRadius]; // tl tr br bl corners

    const relBorderRadius = borderRadiusArray.map((b) => b * fontSize * 0.1); // border radius in canvas units

    const paddingArray = Array.isArray(padding) ? padding : [padding, padding]; // x,y padding
    const relPadding = paddingArray.map((p) => p * fontSize * 0.1); // padding in canvas units
    const lines = text.split("\n");
    const font = `${fontWeight} ${fontSize}px ${fontFace}`;

    ctx.font = font; // measure canvas with appropriate font
    const innerWidth = Math.max(
      ...lines.map((line) => ctx.measureText(line).width)
    );
    const innerHeight = fontSize * lines.length;
    canvas.width = innerWidth + relBorder[0] * 2 + relPadding[0] * 2;
    canvas.height = innerHeight + relBorder[1] * 2 + relPadding[1] * 2;

    // paint border
    if (borderWidth) {
      ctx.strokeStyle = borderColor;

      if (relBorder[0]) {
        // left + right borders
        const hb = relBorder[0] / 2;
        ctx.lineWidth = relBorder[0];
        ctx.beginPath();
        ctx.moveTo(hb, relBorderRadius[0]);
        ctx.lineTo(hb, canvas.height - relBorderRadius[3]);
        ctx.moveTo(canvas.width - hb, relBorderRadius[1]);
        ctx.lineTo(canvas.width - hb, canvas.height - relBorderRadius[2]);
        ctx.stroke();
      }

      if (relBorder[1]) {
        // top + bottom borders
        const hb = relBorder[1] / 2;
        ctx.lineWidth = relBorder[1];
        ctx.beginPath();
        ctx.moveTo(Math.max(relBorder[0], relBorderRadius[0]), hb);
        ctx.lineTo(
          canvas.width - Math.max(relBorder[0], relBorderRadius[1]),
          hb
        );
        ctx.moveTo(
          Math.max(relBorder[0], relBorderRadius[3]),
          canvas.height - hb
        );
        ctx.lineTo(
          canvas.width - Math.max(relBorder[0], relBorderRadius[2]),
          canvas.height - hb
        );
        ctx.stroke();
      }

      if (borderRadius) {
        // strike rounded corners
        const cornerWidth = Math.max(...relBorder);
        const hb = cornerWidth / 2;
        ctx.lineWidth = cornerWidth;
        ctx.beginPath();
        [
          !!relBorderRadius[0] && [
            relBorderRadius[0],
            hb,
            hb,
            relBorderRadius[0],
          ],
          !!relBorderRadius[1] && [
            canvas.width - relBorderRadius[1],
            canvas.width - hb,
            hb,
            relBorderRadius[1],
          ],
          !!relBorderRadius[2] && [
            canvas.width - relBorderRadius[2],
            canvas.width - hb,
            canvas.height - hb,
            canvas.height - relBorderRadius[2],
          ],
          !!relBorderRadius[3] && [
            relBorderRadius[3],
            hb,
            canvas.height - hb,
            canvas.height - relBorderRadius[3],
          ],
        ]
          .filter((d) => d)
          .forEach(([x0, x1, y0, y1]) => {
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y0, x1, y1);
          });
        ctx.stroke();
      }
    }

    // paint background
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      if (!borderRadius) {
        ctx.fillRect(
          relBorder[0],
          relBorder[1],
          canvas.width - relBorder[0] * 2,
          canvas.height - relBorder[1] * 2
        );
      } else {
        // fill with rounded corners
        ctx.beginPath();
        ctx.moveTo(relBorder[0], relBorderRadius[0]);
        [
          [
            relBorder[0],
            relBorderRadius[0],
            canvas.width - relBorderRadius[1],
            relBorder[1],
            relBorder[1],
            relBorder[1],
          ], // t
          [
            canvas.width - relBorder[0],
            canvas.width - relBorder[0],
            canvas.width - relBorder[0],
            relBorder[1],
            relBorderRadius[1],
            canvas.height - relBorderRadius[2],
          ], // r
          [
            canvas.width - relBorder[0],
            canvas.width - relBorderRadius[2],
            relBorderRadius[3],
            canvas.height - relBorder[1],
            canvas.height - relBorder[1],
            canvas.height - relBorder[1],
          ], // b
          [
            relBorder[0],
            relBorder[0],
            relBorder[0],
            canvas.height - relBorder[1],
            canvas.height - relBorderRadius[3],
            relBorderRadius[0],
          ], // t
        ].forEach(([x0, x1, x2, y0, y1, y2]) => {
          ctx.quadraticCurveTo(x0, y0, x1, y1);
          ctx.lineTo(x2, y2);
        });
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.translate(0, 10);
    ctx.translate(...relBorder);
    ctx.translate(...relPadding);

    // paint text
    ctx.font = font; // Set font again after canvas is resized, as context properties are reset
    ctx.fillStyle = color;
    ctx.textBaseline = "bottom";

    const drawTextStroke = strokeWidth > 0;
    if (drawTextStroke) {
      ctx.lineWidth = (strokeWidth * fontSize) / 10;
      ctx.strokeStyle = strokeColor;
    }

    lines.forEach((line, index) => {
      const lineX = (innerWidth - ctx.measureText(line).width) / 2;
      const lineY = (index + 1) * fontSize;

      drawTextStroke && ctx.strokeText(line, lineX, lineY);
      ctx.fillText(line, lineX, lineY);
    });

    const yScale =
      textHeight * lines.length + border[1] * 2 + paddingArray[1] * 2;
    const xScale = (yScale * canvas.width) / canvas.height;

    const scale = [xScale, yScale, 0];

    const positionMap = {
      center: [
        position[0],
        position[1] + scale[1] * positionYTranslateMap[verticalAlign],
        position[2],
      ],
      left: [
        position[0] + scale[0] / 3 + scale[1] / 3 + 0.04,
        position[1],
        position[2],
      ],
      right: [
        position[0] - scale[0] / 3 - scale[1] / 3 - 0.04,
        position[1],
        position[2],
      ],
    };

    return (
      <sprite scale={scale} position={positionMap[textAlign]} {...restProps}>
        <spriteMaterial attach="material" color={spriteMaterialColor}>
          <canvasTexture
            key={children + color + textHeight + strokeWidth + strokeColor}
            attach="map"
            image={canvas}
            minFilter={THREE.LinearFilter}
          />
        </spriteMaterial>
      </sprite>
    );
  }
);

SpriteText.propTypes = {
  children: PropTypes.string,
  position: PropTypes.array,
  textHeight: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  padding: PropTypes.number,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  borderColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  fontFace: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.oneOf(["center", "left", "right"]),
  verticalAlign: PropTypes.oneOf(["center", "top", "bottom"]),
};

export default SpriteText;
