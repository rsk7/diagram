import { Diagram } from "../../AppState";

export interface MapNode {
  content: string;
  children: MapNode[];
}

export default interface MindMapDiagram extends Diagram {
  title: string;
  root?: MapNode;
}
