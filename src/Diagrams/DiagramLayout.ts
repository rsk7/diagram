export interface Positional {
  x: number;
  y: number;
}

export default interface DiagramLayout {
  layoutHeight: number;
  layoutWidth: number;
  diagramStartY: number;
  diagramStartX: number;
  watermark?: Positional;
}
