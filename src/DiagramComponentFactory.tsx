import { ReactNode } from "react";
import { DiagramType } from "./AppState";
import SequenceDiagramComponent from "./components/SequenceDiagram";
import DiagramLayout from "./Diagrams/DiagramLayout";
import MindMapLayout from "./Diagrams/MindMapDiagram/layout/MindMapLayout";
import MindMapReader from "./Diagrams/MindMapDiagram/parser/MindMapReader";
import SequenceDiagramLayout from "./Diagrams/SequenceDiagram/layout/SequenceDiagramLayout";
import SequenceReader from "./Diagrams/SequenceDiagram/parser/SequenceReader";
import MindMapDiagramComponent from "./components/MindMapDiagram";

export default function DiagramComponentFactory(
  text: string,
  type: DiagramType
): {
  layout: DiagramLayout;
  diagramComponent: ReactNode;
} {
  switch (type) {
    case "sequenceDiagram":
      const sdl = SequenceDiagramLayout(SequenceReader(text).diagram);
      return {
        layout: sdl,
        diagramComponent: <SequenceDiagramComponent {...sdl} />
      };
    case "mindMap":
      const mml = MindMapLayout(MindMapReader(text).diagram);
      return {
        layout: mml,
        diagramComponent: <MindMapDiagramComponent {...mml} />
      };
  }
}
