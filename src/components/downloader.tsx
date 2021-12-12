import { ReactComponent as CameraIcon } from "../bootstrap-icons/camera.svg";
import SvgToImageService from "../services/SvgToImageService";

interface DownloaderProps {
  svgIdSelector: string;
}

export default function Downloader(props: DownloaderProps) {
  const download = async () => {
    console.log("started");
    const svg = document.getElementById(props.svgIdSelector);
    if (!svg) return;
    console.log("svg element found");
    const href = await SvgToImageService(svg);
    const link = document.createElement("a");
    console.log("started downloading");
    link.download = "sequence_diagram.png";
    link.style.opacity = "0";
    document.body.appendChild(link);
    link.href = href;
    link.click();
    link.remove();
  };
  return <CameraIcon id="cameraIcon" className="tool" onClick={download} />;
}
