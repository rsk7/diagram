import SequenceDiagram from "../SequenceDiagram";
import { splitLines, findActors, findInteractions } from "./SequenceParser";
import SmartText from "./SmartText";

interface Options {
  enableSmartText?: {
    previousText?: string;
  };
}

export default function SequenceReader(
  text: string,
  options?: Options
): {
  diagram: SequenceDiagram;
  text: string;
} {
  const smartText = options?.enableSmartText
    ? SmartText(text, options.enableSmartText.previousText)
    : text;
  const lines = splitLines(smartText);
  const actors = findActors(lines);
  const interactions = findInteractions(lines);
  return {
    diagram: { actors, interactions },
    text: smartText
  };
}
