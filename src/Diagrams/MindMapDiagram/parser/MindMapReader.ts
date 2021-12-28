import MindMapDiagram from "../MindMapDiagram";

export default function MindMapReader(text: string): {
  diagram: MindMapDiagram;
  text: string;
} {
  return {
    diagram: { title: "test" },
    text
  };
}
