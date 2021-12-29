import { getLineHeight, Tspan, WrapText } from "./TextBoxSizeService";

export type TextAlignment = "center" | "left" | "right";

export default class TextBoxDetails {
  height: number;
  width: number;
  lineHeight: number;
  lines: Tspan[];
  border: boolean;
  font: string;
  padding: number;
  alignment: TextAlignment;
  rounding?: number;

  constructor(
    height: number,
    width: number,
    lineHeight: number,
    lines: Tspan[],
    border: boolean,
    font: string,
    padding: number,
    alignment: TextAlignment,
    rounding?: number
  ) {
    this.height = height;
    this.width = width;
    this.lineHeight = lineHeight;
    this.lines = lines;
    this.border = border;
    this.font = font;
    this.padding = padding;
    this.alignment = alignment;
    this.rounding = rounding;
  }

  getTextPosition(
    boxX: number,
    boxY: number
  ): { textX: number; textY: number; textAnchor: string } {
    switch (this.alignment) {
      case "left":
        return {
          textX: boxX + this.padding,
          textY: boxY + this.padding,
          textAnchor: "start"
        };
      case "right":
        return {
          textX: boxX + this.width - this.padding,
          textY: boxY + this.padding,
          textAnchor: "end"
        };
      case "center":
        return {
          textX: boxX + this.padding + (this.width - this.padding * 2) / 2,
          textY: boxY + this.padding + 2,
          textAnchor: "middle"
        };
      default:
        throw new Error("unknown text alignment");
    }
  }

  static Create(
    text: string,
    font: string,
    maxWidth: number,
    minWidth: number,
    padding: number,
    border: boolean,
    alignment: TextAlignment,
    rounding?: number
  ): TextBoxDetails {
    const lineHeight = getLineHeight(font);
    const lines = WrapText(text, font, maxWidth - padding * 2);
    const boxWidth = lines.reduce(
      (max, curr) => (max < curr.width ? curr.width : max),
      0
    );
    const width = boxWidth < minWidth ? minWidth : boxWidth + padding * 2;
    const height = lineHeight * lines.length + padding * 2;
    return new TextBoxDetails(
      height,
      width,
      lineHeight,
      lines,
      border,
      font,
      padding,
      alignment,
      rounding
    );
  }
}
