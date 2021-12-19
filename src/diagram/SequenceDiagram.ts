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

export default interface SequenceDiagram {
  title: string;
  actors: SequenceActor[];
  interactions?: SequenceInteraction[];
}
