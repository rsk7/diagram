import SequenceDiagram from "./SequenceDiagram";
import { getSize } from "./TextBoxSizeService";
import Position from "./Position";
import { LifelineProps } from "./Lifeline";

export default function sequenceDiagramLayout(
  diagram: SequenceDiagram,
  startPosition: Position
) {
  // layout sequence diagram
  // find actor spacing
  const actors = diagram.actors;

  // find length of lifelines;
  const LENGTH = 500;
  const FONT_SIZE = 12;
  const MAX_WIDTH = 200;
  const MIN_WIDTH = 50;
  const LIFELINE_SEPARATION = 50;

  // need lifeline props here
  const lifelineProps = actors.reduce<LifelineProps[]>(
    (acc: LifelineProps[], value: string) => {
      const { width, height } = getSize(value, FONT_SIZE, MAX_WIDTH, MIN_WIDTH);
      if (!acc.length) {
        return [
          {
            x: startPosition.x,
            y: startPosition.y,
            length: LENGTH,
            name: value,
            fontSize: FONT_SIZE,
            width,
            height
          }
        ];
      } else {
        const previous = acc[acc.length - 1];
        return [
          ...acc,
          {
            x: previous.x + previous.width + LIFELINE_SEPARATION,
            y: previous.y,
            length: LENGTH,
            name: value,
            fontSize: FONT_SIZE,
            width,
            height
          }
        ];
      }
    },
    []
  );

  return {
    lifelineProps
  };
}
