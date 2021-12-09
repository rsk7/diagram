export interface SequenceInteraction {
  fromActor: string;
  toActor: string;
  description: string;
}

export interface SequenceActor {
  name: string;
  spacingRight?: number;
}

export default interface SequenceDiagram {
  actors: SequenceActor[];
  interactions?: SequenceInteraction[];
}
