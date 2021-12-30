import {
  EditorView,
  Decoration,
  ViewPlugin,
  DecorationSet,
  ViewUpdate
} from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/rangeset";
import {
  findActorLines,
  findInteractionLines
} from "../Diagrams/SequenceDiagram/parser/SequenceLines";
import { Line } from "@codemirror/text";
import { Line as SequenceLine, findTitleLines } from "../Diagrams/parser";
import { findRelationLines } from "../Diagrams/MindMapDiagram/parser/MindMapLines";

const baseTheme = EditorView.baseTheme({
  ".cm-sequence-code": { backgroundColor: "rgb(144, 238, 144, 0.2)" }
});

const highlight = Decoration.line({
  attributes: { class: "cm-sequence-code" }
});

interface LineTypePair {
  sequenceLine: SequenceLine;
  codeMirrorLine: Line;
}

type HighlightLineFinder = (lines: SequenceLine[]) => SequenceLine[];

function stripeDeco(
  view: EditorView,
  highlightLineFinders: HighlightLineFinder[]
): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  for (let { from, to } of view.visibleRanges) {
    const lines = new Map<number, LineTypePair>();
    for (let pos = from; pos <= to; ) {
      let line = view.state.doc.lineAt(pos);
      lines.set(line.number, {
        sequenceLine: { lineNumber: line.number, text: line.text },
        codeMirrorLine: line
      });
      pos = line.to + 1;
    }
    const sequenceLines = Array.from(lines.values()).map((l) => l.sequenceLine);
    const highlightLines = highlightLineFinders
      .map((f) => f(sequenceLines))
      .flat()
      .map((l) => lines.get(l.lineNumber))
      .filter((l) => l)
      .sort((a, b) => a!.codeMirrorLine.from - b!.codeMirrorLine.from);
    for (const line of highlightLines) {
      const pos = line!.codeMirrorLine.from;
      builder.add(pos, pos, highlight);
    }
  }
  return builder.finish();
}

function showHighlight(highlightLineFinders: HighlightLineFinder[]) {
  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) {
        this.decorations = stripeDeco(view, highlightLineFinders);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = stripeDeco(update.view, highlightLineFinders);
        }
      }
    },
    {
      decorations: (v) => v.decorations
    }
  );
}

function decorateCode(highlightLineFinders: HighlightLineFinder[]) {
  return [baseTheme, showHighlight(highlightLineFinders)];
}

export const decorateSequenceCode = decorateCode([
  findTitleLines,
  findActorLines,
  findInteractionLines
]);

export const decorateMapCode = decorateCode([
  findTitleLines,
  findRelationLines
]);
