interface Tspan {
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

function getLineHeight(text: string, font: string): number {
  const renderDiv = document.createElement("div");
  renderDiv.innerText = text;
  renderDiv.style.position = "absolute";
  renderDiv.style.font = font;
  renderDiv.style.whiteSpace = "nowrap";
  document.getElementsByTagName("body")[0].appendChild(renderDiv);
  const height = renderDiv.clientHeight;
  renderDiv.remove();
  return height;
}

export function getSize(
  text: string,
  font: string,
  maxWidth: number,
  minWidth: number,
  padding: number
): { height: number; width: number } {
  const lineHeight = getLineHeight(text, font);
  const lines = WrapText(text, font, maxWidth - padding * 2);
  const boxWidth = lines.reduce((max, curr) => {
    if (max < curr.width) {
      return curr.width;
    } else {
      return max;
    }
  }, 0);
  return {
    height: lineHeight * lines.length + padding * 2,
    width: boxWidth < minWidth ? minWidth : boxWidth + padding * 2
  };
}

export function getSize_old(
  text: string,
  fontSize: number,
  maxWidth: number,
  minWidth: number,
  padding: number
) {
  const renderDiv = document.createElement("div");
  renderDiv.innerText = text;
  renderDiv.style.position = "absolute";
  //renderDiv.style.fontSize = `${fontSize}px`;
  renderDiv.style.font = `${fontSize}px Arial`;
  renderDiv.style.display = "block";
  renderDiv.style.minWidth = `${minWidth}px`;
  renderDiv.style.maxWidth = `${maxWidth}px`;
  renderDiv.style.border = "1px solid black";
  renderDiv.style.textAlign = "center";
  document.getElementsByTagName("body")[0].appendChild(renderDiv);
  const result = {
    height: renderDiv.clientHeight + padding * 2,
    width: renderDiv.clientWidth + padding * 2
  };
  return result;
}
