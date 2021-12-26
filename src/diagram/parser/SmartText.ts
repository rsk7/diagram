import { splitLines, findActorLines } from "./SequenceLines";
import { findActorNames, createSequenceActor } from "./SequenceParser";
import esc from "escape-string-regexp";

function replaceActorName(
  smartText: string,
  currentActorRawString: string,
  previousActorRawString: string
): string {
  const currentName = esc(createSequenceActor(currentActorRawString).name);
  const previousName = esc(createSequenceActor(previousActorRawString).name);
  smartText = smartText.replace(
    new RegExp(`([\n|#])${previousName} --([^>])`, "g"),
    `$1${currentName} --$2`
  );
  smartText = smartText.replace(
    new RegExp(`--( )*${previousName}(\\s*\\n)`, "g"),
    `--$1${currentName}$2`
  );
  smartText = smartText.replace(
    new RegExp(`([\n|#])${previousName}(\\s)*<--`, "g"),
    `$1${currentName}$2<--`
  );
  smartText = smartText.replace(
    new RegExp(`-->( )*${previousName}(\\s*\\n)`, "g"),
    `-->$1${currentName}$2`
  );
  return smartText;
}

/**
 * Function that uses regex to replace actor names throughout text.
 * Useful for when renaming actors. It can get a funky if an actor is renamed
 * to be a duplicate.
 *
 * @param current Current text
 * @param previous Previous text
 */
export default function SmartText(current: string, previous?: string): string {
  if (!previous) return current;
  let smartText = !current.endsWith("\n") ? current + "\n" : current;
  const currentActorLines = findActorLines(splitLines(current));
  const previousActorLines = findActorLines(splitLines(previous));
  if (!currentActorLines.length || !previousActorLines.length) return current;
  for (let i = 0; i < currentActorLines.length; i++) {
    const currentActorNames = findActorNames(currentActorLines[i].text);
    const previousActorNames = findActorNames(previousActorLines[i].text);
    if (currentActorNames.length !== previousActorNames.length) continue;
    for (let j = 0; j < currentActorNames.length; j++) {
      if (currentActorNames[j] === previousActorNames[j]) continue;
      smartText = replaceActorName(
        smartText,
        currentActorNames[j],
        previousActorNames[j]
      );
    }
  }
  return smartText;
}
