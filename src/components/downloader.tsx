import { ReactComponent as CameraIcon } from "../bootstrap-icons/camera.svg";
import { downloadPng, downloadSvg } from "../services/DownloadService";
import { ReactComponent as DownloadIcon } from "../bootstrap-icons/download.svg";

interface DownloaderProps {
  svgIdSelector: string;
  type: "png" | "svg";
  layoutHeight: number;
  layoutWidth: number;
}

export default function Downloader(props: DownloaderProps) {
  switch (props.type) {
    case "png":
      return (
        <CameraIcon
          className="tool"
          onClick={() =>
            downloadPng(
              props.svgIdSelector,
              "sequence_diagram.png",
              props.layoutHeight,
              props.layoutWidth
            )
          }
        />
      );
    case "svg":
      return (
        <DownloadIcon
          className="tool"
          onClick={() =>
            downloadSvg(
              props.svgIdSelector,
              "sequence_diagram.svg",
              props.layoutHeight,
              props.layoutWidth
            )
          }
        />
      );
    default:
      throw new Error("Unknown downloader type");
  }
}
