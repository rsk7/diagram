import { useState } from "react";

export default function useSvgZoomState(zoomLevel: number) {
  const [zoomState, setZoomState] = useState<number>(zoomLevel);
  const zoomInterval = 0.05;

  const handleZoom = (scrollUp: boolean) => {
    setZoomState(
      scrollUp ? zoomState - zoomInterval : zoomState + zoomInterval
    );
  };

  return {
    zoomState,
    handleZoom
  };
}
