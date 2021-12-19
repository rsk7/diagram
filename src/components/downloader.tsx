import { ReactComponent as CameraIcon } from "../bootstrap-icons/camera.svg";
import { downloadPng, downloadSvg } from "../services/DownloadService";
import { useState } from "react";
import "./downloader.css";
import ReactDOM from "react-dom";

interface DownloaderProps {
  svgIdSelector: string;
  type: "png" | "svg";
  layoutHeight: number;
  layoutWidth: number;
  diagramStartY: number;
  fileName?: string;
}

const downloadOptions = ({
  isOpen,
  svgClick,
  pngClick
}: {
  isOpen: boolean;
  svgClick: () => {};
  pngClick: () => {};
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal tool-options">
      <button onClick={svgClick}>SVG</button>
      <button onClick={pngClick}>PNG</button>
    </div>,
    document.body
  );
};

export default function Downloader(props: DownloaderProps) {
  const [showOptions, toggleShowOptions] = useState(false);
  const fileName = props.fileName || "sequence_diagram";
  const modal = downloadOptions({
    isOpen: showOptions,
    svgClick: () =>
      downloadSvg(
        "mainDiagram",
        `${fileName}.svg`,
        props.layoutHeight,
        props.layoutWidth,
        props.diagramStartY
      ),
    pngClick: () =>
      downloadPng(
        "mainDiagram",
        `${fileName}.png`,
        props.layoutHeight,
        props.layoutWidth,
        props.diagramStartY
      )
  });
  return (
    <div>
      {modal}
      <CameraIcon
        className="tool"
        onClick={() => toggleShowOptions(!showOptions)}
      />
    </div>
  );
}
