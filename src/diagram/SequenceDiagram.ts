export interface SequenceInteraction {
  fromActor: string;
  toActor: string;
  description: string;
}

export default interface SequenceDiagram {
  actors: string[];
  interactions?: SequenceInteraction[];
}
