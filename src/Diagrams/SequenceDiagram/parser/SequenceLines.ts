import { interactionLineRegex } from "./regex";
import { Line } from "../../parser";

export function isActorLine(line: Line): boolean {
  return line.text.startsWith("actor:") || line.text.startsWith("actors:");
}

export function isCommentLine(line: Line): boolean {
  return line.text.trim().startsWith("#");
}

export function isInteractionLine(line: Line): boolean {
  if (line.text?.trim() && line.text?.startsWith("#")) return false;
  for (const matcher of interactionLineRegex) {
    const match = line.text.match(matcher);
    if (match?.groups) return true;
  }
  return false;
}

export function isAnnotationLine(line: Line): boolean {
  return (
    !!line.text?.trim().length &&
    !isInteractionLine(line) &&
    !isActorLine(line) &&
    !isCommentLine(line)
  );
}

export function findLinesThatCanHaveAnnotations(
  lineTypeTest: (l: Line) => boolean
): (lines: Line[]) => Line[] {
  return function (lines: Line[]) {
    const resultLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (lineTypeTest(lines[i])) {
        resultLines.push(lines[i]);
        if (i + 1 < lines.length) {
          if (isAnnotationLine(lines[i + 1])) {
            resultLines.push(lines[i + 1]);
          }
        }
      }
    }
    return resultLines;
  };
}

export const findActorLines = findLinesThatCanHaveAnnotations(isActorLine);
export const findInteractionLines =
  findLinesThatCanHaveAnnotations(isInteractionLine);
