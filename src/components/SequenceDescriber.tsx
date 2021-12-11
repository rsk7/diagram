import { useEffect, useRef, useState } from "react";
import "./SequenceDescriber.css";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";
import { ReactComponent as BulbIcon } from "../bootstrap-icons/lightbulb.svg";
import { ReactComponent as MoveIcon } from "../bootstrap-icons/arrows-move.svg";
import { ReactComponent as CloseIcon } from "../bootstrap-icons/x-lg.svg";

interface SequenceDescriberProps {
  sequenceText: string;
  smartTextOn: boolean;
  onSmartTextToggle: () => void;
  onChange: (sequnenceText: string) => void;
  onClose: () => void;
  isVisible: boolean;
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
    <Draggable bounds="parent" handle="#move">
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
          className={props.isVisible ? "" : "hide"}
          style={{
            width: boxState.width + "px",
            height: boxState.height + "px"
          }}
        >
          <div className="tools">
            <BulbIcon
              id="lightbulb"
              className={`tool ${props.smartTextOn ? "on" : ""}`}
              onClick={props.onSmartTextToggle}
            />
            <MoveIcon id="move" className="tool" />
            <CloseIcon id="close" className="tool" onClick={props.onClose} />
          </div>
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
    </Draggable>
  );
}
