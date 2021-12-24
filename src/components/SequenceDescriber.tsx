import { useEffect, useRef, useState } from "react";
import "./SequenceDescriber.css";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";
import { ReactComponent as MoveIcon } from "../bootstrap-icons/arrows-move.svg";
import { ReactComponent as CloseIcon } from "../bootstrap-icons/x-lg.svg";
import { ReactComponent as ClipboardIcon } from "../bootstrap-icons/clipboard.svg";
import { ReactComponent as ClipboardCheckIcon } from "../bootstrap-icons/clipboard-check.svg";
import { ReactComponent as TrashIcon } from "../bootstrap-icons/trash.svg";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, basicSetup } from "@codemirror/basic-setup";

interface SequenceDescriberProps {
  sequenceText: string;
  smartTextOn: boolean;
  onSmartTextToggle: () => void;
  onChange: (sequnenceText: string) => void;
  onClose: () => void;
  onDelete: () => void;
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
  const nodeRef = useRef(null);

  const [showClipSuccess, setShowClipSuccess] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.sequenceText);
    setShowClipSuccess(true);
  };
  useEffect(() => {
    if (showClipSuccess) {
      setTimeout(() => setShowClipSuccess(false), 5000);
    }
  });
  const Theme = EditorView.theme({
    ".cm-content": {
      fontSize: "10pt"
    }
  });
  return (
    <Draggable nodeRef={nodeRef} bounds="parent" handle="#move">
      <Resizable
        height={boxState.height}
        width={boxState.width}
        onResize={(e, { size }) => {
          setBoxState({
            height: size.height,
            width: size.width
          });
        }}
      >
        <div
          ref={nodeRef}
          id="sequenceDescriber"
          className={props.isVisible ? "" : "hide"}
          style={{
            width: boxState.width + "px",
            height: boxState.height + "px"
          }}
        >
          <div className="tools">
            <TrashIcon className="tool" onClick={props.onDelete} />
            {showClipSuccess ? (
              <ClipboardCheckIcon className="tool" onClick={copyToClipboard} />
            ) : (
              <ClipboardIcon className="tool" onClick={copyToClipboard} />
            )}
            <MoveIcon id="move" className="tool" />
            <CloseIcon id="close" className="tool" onClick={props.onClose} />
          </div>
          <div className="cm-container">
            <CodeMirror
              value={props.sequenceText}
              extensions={[basicSetup, EditorView.lineWrapping, Theme]}
              onChange={(value) => {
                props.onChange(value);
              }}
            />
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}
