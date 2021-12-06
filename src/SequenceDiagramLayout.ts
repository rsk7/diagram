import SequenceDiagram, { SequenceInteraction } from "./SequenceDiagram";
import { getSize } from "./TextBoxSizeService";
import Position from "./Position";
import { LifelineProps } from "./Lifeline";
import { MessageArrowProps } from "./MessageArrow";

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
  const INTERACTION_LINE_PADDING = 5;
  const MESSAGE_ARROW_DESCRIPTION_PADDING = 20;

  // need lifeline props here
  const lifelineProps = actors
    .reduce<LifelineProps[]>((acc: LifelineProps[], value: string) => {
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
            height,
            lineX: Math.floor(width / 2) + startPosition.x
          }
        ];
      } else {
        const previous = acc[acc.length - 1];
        const x = previous.x + previous.width + LIFELINE_SEPARATION;
        return [
          ...acc,
          {
            x,
            y: previous.y,
            length: LENGTH,
            name: value,
            fontSize: FONT_SIZE,
            width,
            height,
            lineX: Math.floor(width / 2) + x
          }
        ];
      }
    }, [])
    .reduce<Map<string, LifelineProps>>((acc, value) => {
      acc.set(value.name, value);
      return acc;
    }, new Map<string, LifelineProps>());

  const maxLifelineHeight = Array.from(lifelineProps.values()).reduce(
    (acc, value) => {
      return acc > value.height ? acc : value.height;
    },
    0
  );

  const interactionStartY =
    maxLifelineHeight + startPosition.y + INTERACTION_LINE_PADDING;
  const interactions = diagram.interactions;

  const messageArrowProps = interactions?.reduce<MessageArrowProps[]>(
    (acc: MessageArrowProps[], value: SequenceInteraction) => {
      const fromLifeline = lifelineProps.get(value.fromActor);
      const toLifeline = lifelineProps.get(value.toActor);
      if (!fromLifeline || !toLifeline) return acc;
      const distanceX = fromLifeline.lineX - toLifeline.lineX;
      const endX = toLifeline.lineX - (distanceX > 0 ? -5 : 5);
      const { width, height } = getSize(
        value.description,
        FONT_SIZE,
        Math.abs(distanceX) - MESSAGE_ARROW_DESCRIPTION_PADDING - 10,
        MIN_WIDTH
      );
      const labelX =
        distanceX < 0
          ? fromLifeline.lineX + MESSAGE_ARROW_DESCRIPTION_PADDING / 2
          : fromLifeline.lineX - width - MESSAGE_ARROW_DESCRIPTION_PADDING / 2;
      if (!acc.length) {
        return [
          {
            startX: fromLifeline.lineX,
            startY:
              interactionStartY + height + MESSAGE_ARROW_DESCRIPTION_PADDING,
            endX,
            endY:
              interactionStartY + height + MESSAGE_ARROW_DESCRIPTION_PADDING,
            description: value.description,
            labelX,
            labelY: interactionStartY + MESSAGE_ARROW_DESCRIPTION_PADDING - 2,
            labelHeight: height,
            labelWidth: width
          }
        ];
      } else {
        const previous = acc[acc.length - 1];
        const y =
          previous.startY +
          height +
          INTERACTION_LINE_PADDING +
          MESSAGE_ARROW_DESCRIPTION_PADDING;
        return [
          ...acc,
          {
            startX: fromLifeline.lineX,
            startY: y,
            endX,
            endY: y,
            description: value.description,
            labelX,
            labelY:
              previous.startY +
              INTERACTION_LINE_PADDING +
              MESSAGE_ARROW_DESCRIPTION_PADDING -
              2,
            labelHeight: height,
            labelWidth: width
          }
        ];
      }
    },
    []
  );

  return {
    lifelineProps,
    messageArrowProps
  };
}
