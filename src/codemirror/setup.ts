import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter";
import { Extension } from "@codemirror/state";
import { history, historyKeymap } from "@codemirror/history";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { defaultKeymap } from "@codemirror/commands";
import { keymap, EditorView } from "@codemirror/view";
import { decorateMapCode, decorateSequenceCode } from "./decorateCode";
import { DiagramType } from "../AppState";

const Theme = EditorView.theme({
  ".cm-content": {
    fontSize: "10pt"
  }
});

const diagramSetup: Extension[] = [
  lineNumbers(),
  highlightActiveLineGutter(),
  history(),
  highlightSelectionMatches(),
  keymap.of([...defaultKeymap, ...searchKeymap, ...historyKeymap]),
  EditorView.lineWrapping,
  Theme
];

export default function createExtenstions(type: DiagramType): Extension[] {
  switch (type) {
    case "mindMap":
      return [...diagramSetup, decorateMapCode];
    case "sequenceDiagram":
    default:
      return [...diagramSetup, decorateSequenceCode];
  }
}
