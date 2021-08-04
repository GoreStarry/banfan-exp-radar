import React, { useRef, useState, useCallback, useEffect } from "react";

export default function useResizeContainerSize(targetRef) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const resize = useCallback(() => {
    setSize({
      width: targetRef.current?.offsetWidth || 0,
      height: targetRef.current?.offsetHeight || 0,
    });
  }, []);

  useEffect(() => {
    const resizeEventListener = window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resizeEventListener);
    };
  }, []);

  return size;
}
