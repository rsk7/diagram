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
  findInteractionLines,
  findTitleLines,
  Line as SequenceLine
} from "../Diagrams/SequenceDiagram/parser/SequenceLines";
import { Line } from "@codemirror/text";

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

function stripeDeco(view: EditorView): DecorationSet {
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
    const highlightLines = [
      ...findActorLines(sequenceLines),
      ...findInteractionLines(sequenceLines),
      ...findTitleLines(sequenceLines)
    ]
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

const showHighlight = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = stripeDeco(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = stripeDeco(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations
  }
);

export function decorateSequenceCode() {
  return [baseTheme, showHighlight];
}
