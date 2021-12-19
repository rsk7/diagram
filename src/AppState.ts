import SequenceDiagram from "./diagram/SequenceDiagram";

export default interface AppState {
  diagram: SequenceDiagram;
  fileGUID: string;
  fileName: string;
  text: string;
  smartTextEnabled: boolean;
  showSequenceDescriber: boolean;
  files: { guid: string; fileName: string }[];
}
