export type DiagramType = "sequenceDiagram" | "mindMap";

export interface Diagram {
  title: string;
}

export interface DiagramFile {
  guid: string;
  fileName: string;
  fileType: DiagramType;
}

export default interface AppState {
  fileGUID: string;
  fileName: string;
  fileType: DiagramType;
  text: string;
  showDescriber: boolean;
  files: DiagramFile[];
}
