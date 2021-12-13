import SvgToImageService, { svgToDataUrl } from "./SvgToImageService";

function svgForDownload(
  svgIdSelector: string,
  layoutHeight: number,
  layoutWidth: number,
  svgAction: (svg: HTMLElement) => Promise<void>
) {
  const svg = document.getElementById(svgIdSelector);
  if (!svg) throw new Error("svg not found");
  const clonedSvg = svg.cloneNode(true) as HTMLElement;
  const matrixGroup = clonedSvg.querySelector("#matrix-group") as SVGGElement;
  matrixGroup.setAttribute("transform", "1 0 0 1 0 0");
  clonedSvg.setAttribute("viewBox", `1 1 ${layoutWidth} ${layoutHeight}`);
  return svgAction(clonedSvg);
}

function download(href: string, fileName: string) {
  const link = document.createElement("a");
  link.download = fileName;
  link.style.opacity = "0";
  document.body.appendChild(link);
  link.href = href;
  link.click();
  link.remove();
}

export async function downloadPng(
  svgIdSelector: string,
  fileName: string,
  layoutHeight: number,
  layoutWidth: number
) {
  svgForDownload(svgIdSelector, layoutHeight, layoutWidth, async (svg) => {
    const href = await SvgToImageService(svg, layoutHeight, layoutWidth);
    download(href, fileName);
  });
}

export async function downloadSvg(
  svgIdSelector: string,
  fileName: string,
  layoutHeight: number,
  layoutWidth: number
) {
  svgForDownload(svgIdSelector, layoutHeight, layoutWidth, async (svg) => {
    const href = await svgToDataUrl(svg);
    download(href, fileName);
  });
}
