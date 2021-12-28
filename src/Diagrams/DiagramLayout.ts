import Title from "./SequenceDiagram/layout/Title";

export interface Positional {
  x: number;
  y: number;
}

export default interface DiagramLayout {
  title?: Title;
  layoutHeight: number;
  layoutWidth: number;
  diagramStartY: number;
  diagramStartX: number;
  watermark?: Positional;
}
