import SequenceDiagram from "../SequenceDiagram";
import { nextColors } from "../../services/DarkColors";
import AnnotationDescription from "./AnnotationDescription";

export interface AnnotationData {
  text: string;
  index: number;
  color: string;
  font: string;
}

const FONT = "8px Arial";

export function createAnnotationMap(
  diagram: SequenceDiagram
): Map<string, AnnotationData> {
  const annotations = [
    ...diagram.actors,
    ...(diagram.interactions || [])
  ].filter((a) => a.annotation);
  const colors = nextColors(annotations.length);
  return annotations
    .map<AnnotationData>((a, index) => {
      return {
        text: a.annotation || "",
        index: ++index,
        color: colors[index],
        font: FONT
      };
    })
    .reduce((acc, a) => {
      if (!acc.get(a.text)) {
        acc.set(a.text, a);
      }
      return acc;
    }, new Map<string, AnnotationData>());
}

export function setAnnotationIndex(
  entities: {
    annotationText?: string;
    annotationData?: AnnotationData;
  }[],
  annotationMap: Map<string, AnnotationData>
): void {
  entities.forEach((e) => {
    e.annotationData = annotationMap.get(e.annotationText || "");
  });
}

export default function createAnnotationSequence(
  annotationData: AnnotationData[],
  startX: number,
  startY: number,
  layoutWidth: number
): AnnotationDescription[] {
  return annotationData.reduce<AnnotationDescription[]>((acc, value) => {
    if (!acc.length) {
      acc.push(new AnnotationDescription(startX, startY, layoutWidth, value));
    } else {
      const previous = acc[acc.length - 1];
      acc.push(
        new AnnotationDescription(startX, previous.endY, layoutWidth, value)
      );
    }
    return acc;
  }, []);
}
