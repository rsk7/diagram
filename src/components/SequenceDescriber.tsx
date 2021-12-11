import { useEffect, useRef, useState } from "react";
import { ReactComponent as LightbulbIcon } from "../lightbulb-svgrepo-com.svg";
import "./SequenceDescriber.css";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";
import { ReactComponent as MoveIcon } from "../move-svgrepo-com.svg";
import { ReactComponent as CloseIcon } from "../close-svgrepo-com.svg";

interface SequenceDescriberProps {
  sequenceText: string;
  smartTextOn: boolean;
  onSmartTextToggle: () => void;
  onChange: (sequnenceText: string) => void;
  onClose: () => void;
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
    <div id="sequenceDescriber-dragContainer">
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
            style={{
              width: boxState.width + "px",
              height: boxState.height + "px"
            }}
          >
            <div className="tools">
              <LightbulbIcon
                id="lightbulb"
                onClick={props.onSmartTextToggle}
                className={`${props.smartTextOn ? "on" : "off"} tool`}
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
    </div>
  );
}
