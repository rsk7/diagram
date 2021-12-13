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
  const modal = downloadOptions({
    isOpen: showOptions,
    svgClick: () =>
      downloadSvg(
        "mainDiagram",
        "sequence_diagram.svg",
        props.layoutHeight,
        props.layoutWidth
      ),
    pngClick: () =>
      downloadPng(
        "mainDiagram",
        "sequence_diagram.png",
        props.layoutHeight,
        props.layoutWidth
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
