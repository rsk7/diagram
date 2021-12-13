export interface Tspan {
  text: string;
  width: number;
}

let canvas: HTMLCanvasElement | undefined;

/**
 * Build wordwrap for svg text because svg 2 will probably never happen.
 */
export function WrapText(
  text: string,
  font: string,
  maxWidth: number
): Tspan[] {
  canvas = canvas || document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx)
    throw new Error("Canvas context could not be created for measuring text");
  const result = [];
  ctx.font = font;
  const split = text.split(/(\s+)/);
  const { width } = ctx.measureText(text);
  let maxLineWidth = 0;
  if (width > maxWidth) {
    let currentLine = "";
    for (const s of split) {
      // build current line
      const currentLineWidthPlusWord = ctx.measureText(currentLine + s).width;
      if (currentLineWidthPlusWord <= maxWidth) {
        currentLine = currentLine + s;
      } else {
        if (width > maxLineWidth) maxLineWidth = width;
        if (!currentLine.length) {
          result.push({
            text: s,
            width: ctx.measureText(s).width
          });
          currentLine = "";
        } else {
          result.push({
            text: currentLine,
            width: ctx.measureText(currentLine).width
          });
          currentLine = s;
        }
      }
    }
    if (currentLine.trim().length) {
      result.push({
        text: currentLine,
        width: ctx.measureText(currentLine).width
      });
    }
  } else {
    result.push({ text, width, dy: 0 });
  }
  return result;
}

const fontToLineHeightMap = new Map<string, number>();

export function getLineHeight(font: string): number {
  let lineHeight = fontToLineHeightMap.get(font.toLowerCase());
  if (lineHeight) return lineHeight;
  const renderDiv = document.createElement("div");
  renderDiv.innerText = "Aa";
  renderDiv.style.position = "absolute";
  renderDiv.style.font = font;
  renderDiv.style.whiteSpace = "nowrap";
  document.getElementsByTagName("body")[0].appendChild(renderDiv);
  lineHeight = renderDiv.clientHeight;
  fontToLineHeightMap.set(font.toLowerCase(), lineHeight);
  renderDiv.remove();
  return lineHeight;
}
