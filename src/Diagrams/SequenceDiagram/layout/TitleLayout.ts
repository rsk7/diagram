import Title from "./Title";

export default function createTitle(
  text: string,
  startX: number,
  startY: number,
  layoutWidth: number
) {
  return new Title(startX, startY, text, layoutWidth);
}
