import { Diagram, DiagramType } from "../AppState";
import MindMapReader from "./MindMapDiagram/parser/MindMapReader";
import SequenceReader from "./SequenceDiagram/parser/SequenceReader";

export default function DiagramFactory(
  text: string,
  type: DiagramType
): Diagram {
  switch (type) {
    case "sequenceDiagram":
      return SequenceReader(text).diagram;
    case "mindMap":
      return MindMapReader(text).diagram;
    default:
      throw new Error("Unknown diagram type");
  }
}
