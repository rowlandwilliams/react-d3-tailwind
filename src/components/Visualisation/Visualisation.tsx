import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { debounce } from "lodash";
import { drawVisualisation } from "./utils/plot-utils";

export const Visualisation = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleWindowResize = debounce((current: HTMLDivElement) => {
    setWidth(current.offsetWidth);
    setHeight(current.offsetHeight);
  }, 100);

  useEffect(() => {
    const { current } = parentRef;
    if (current) {
      handleWindowResize(current);
      const setResize = () => handleWindowResize(current);
      window.addEventListener("resize", setResize);
      return () => window.removeEventListener("resize", setResize);
    }
  }, [parentRef, handleWindowResize]);

  useEffect(() => {
    drawVisualisation(width, height);
    setIsLoaded(true);
  }, [width, height]);

  return (
    <>
      <div
        className={classNames(
          "relative w-screen h-96 md:h-screen transition-all duration-1000 bg-gray-800",
          { "opacity-0": !isLoaded }
        )}
        ref={parentRef}
      >
        <svg width={width} height={height} id="map-svg">
          <rect width={width} height={height} fill="red"></rect>
        </svg>
      </div>
    </>
  );
};
