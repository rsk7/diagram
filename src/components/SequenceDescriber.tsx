import { useEffect, useRef } from "react";
import { ReactComponent as Lightbulb } from "../lightbulb-svgrepo-com.svg";
import "./SequenceDescriber.css";

interface SequenceDescriberProps {
  sequenceText: string;
  smartTextOn: boolean;
  onSmartTextToggle: () => void;
  onChange: (sequnenceText: string) => void;
}

export default function SequenceDescriber(props: SequenceDescriberProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const selectionEndRef = useRef<number>(0);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.selectionEnd = selectionEndRef.current;
    }
  });
  return (
    <div id="sequenceDescriber">
      <Lightbulb
        id="lightbulb"
        onClick={props.onSmartTextToggle}
        className={props.smartTextOn ? "on" : "off"}
      />
      <textarea
        ref={textAreaRef}
        value={props.sequenceText}
        onChange={(e) => {
          selectionEndRef.current = e.target.selectionEnd;
          props.onChange(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
