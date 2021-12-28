import { Diagram } from "../../AppState";

export interface SequenceInteraction {
  fromActor: string;
  toActor: string;
  description: string;
  annotation?: string;
}

export interface SequenceActor {
  name: string;
  spacingRight?: number;
  annotation?: string;
}

export default interface SequenceDiagram extends Diagram {
  title: string;
  actors: SequenceActor[];
  interactions?: SequenceInteraction[];
}
