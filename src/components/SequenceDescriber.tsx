import { useEffect, useRef, useState } from "react";
import { ReactComponent as Lightbulb } from "../lightbulb-svgrepo-com.svg";
import "./SequenceDescriber.css";
import { Resizable } from "react-resizable";

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
  const [boxState, setBoxState] = useState({
    height: 600,
    width: 500
  });
  return (
    <Resizable
      height={boxState.height}
      width={boxState.width}
      onResize={(e, { size }) => {
        console.log("resize called");
        setBoxState({
          height: size.height,
          width: size.width
        });
      }}
    >
      <div
        id="sequenceDescriber"
        style={{
          width: boxState.width + "px",
          height: boxState.height + "px"
        }}
      >
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
    </Resizable>
  );
}
