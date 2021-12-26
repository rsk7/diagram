import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter";
import { Extension } from "@codemirror/state";
import { history, historyKeymap } from "@codemirror/history";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { defaultKeymap } from "@codemirror/commands";
import { keymap, EditorView } from "@codemirror/view";
import { decorateSequenceCode } from "./decoration";

const Theme = EditorView.theme({
  ".cm-content": {
    fontSize: "10pt"
  }
});

export const setup: Extension[] = [
  lineNumbers(),
  highlightActiveLineGutter(),
  history(),
  highlightSelectionMatches(),
  keymap.of([...defaultKeymap, ...searchKeymap, ...historyKeymap]),
  decorateSequenceCode(),
  EditorView.lineWrapping,
  Theme
];
