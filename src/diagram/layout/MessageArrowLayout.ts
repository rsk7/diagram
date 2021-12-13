import { SequenceInteraction } from "../SequenceDiagram";
import Lifeline from "./Lifeline";
import MessageArrow from "./MessageArrow";
import MessageArrowReflexive from "./MessageArrowReflexive";

function createMessageArrow(
  interaction: SequenceInteraction,
  startY: number,
  lifelinePropsMap: Map<string, Lifeline>
): MessageArrow | undefined {
  const fromLifeline = lifelinePropsMap.get(interaction.fromActor);
  const toLifeline = lifelinePropsMap.get(interaction.toActor);
  if (!fromLifeline || !toLifeline) return;
  return fromLifeline.name === toLifeline.name
    ? new MessageArrowReflexive(
        fromLifeline.lineX,
        toLifeline.lineX,
        interaction,
        startY
      )
    : new MessageArrow(
        fromLifeline.lineX,
        toLifeline.lineX,
        interaction,
        startY
      );
}

export function createMessageArrowSequence(
  interactions: SequenceInteraction[],
  startY: number,
  lifelinePropsMap: Map<string, Lifeline>
): MessageArrow[] {
  return interactions.reduce<MessageArrow[]>((acc, value) => {
    if (!acc.length) {
      const ma = createMessageArrow(value, startY, lifelinePropsMap);
      if (ma) acc.push(ma);
    } else {
      const previous = acc[acc.length - 1];
      const ma = createMessageArrow(value, previous.endY, lifelinePropsMap);
      if (ma) acc.push(ma);
    }
    return acc;
  }, []);
}
