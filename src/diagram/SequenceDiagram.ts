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
  title: string;
  actors: SequenceActor[];
  interactions?: SequenceInteraction[];
}
