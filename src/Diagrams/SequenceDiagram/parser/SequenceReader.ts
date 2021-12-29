import SequenceDiagram from "../SequenceDiagram";
import { splitLines, findTitle } from "../../parser";
import { findActors, findInteractions } from "./SequenceParser";
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
  const title = findTitle(lines);
  const actors = findActors(lines);
  const interactions = findInteractions(lines);
  return {
    diagram: { title, actors, interactions },
    text: smartText
  };
}
