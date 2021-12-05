export default interface SequenceDiagram {
  actors: string[];
  interactions?: {
    fromActor: string;
    toActor: string;
    description: string;
  }[];
}
