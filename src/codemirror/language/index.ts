import { parser } from "./parser";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@codemirror/highlight";

export const SequenceLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        LineComment: t.lineComment,
        Actor: t.variableName,
        String: t.string
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "#" }
  }
});

export function sequenceLang() {
  return new LanguageSupport(SequenceLanguage);
}
