import { useEffect, useRef, useState } from "react";
import "./Describer.css";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";
import { ReactComponent as MoveIcon } from "../bootstrap-icons/arrows-move.svg";
import { ReactComponent as CloseIcon } from "../bootstrap-icons/x-lg.svg";
import { ReactComponent as ClipboardIcon } from "../bootstrap-icons/clipboard.svg";
import { ReactComponent as ClipboardCheckIcon } from "../bootstrap-icons/clipboard-check.svg";
import { ReactComponent as TrashIcon } from "../bootstrap-icons/trash.svg";
import CodeMirror from "@uiw/react-codemirror";
import createExtenstions from "../codemirror/setup";
import { DiagramType } from "../AppState";

interface DescriberProps {
  text: string;
  diagramType: "sequenceDiagram" | "mindMap";
  onChange: (sequnenceText: string) => void;
  onClose: () => void;
  onDelete: () => void;
  isVisible: boolean;
  onDiagramTypeChange: (diagram: DiagramType) => void;
}

export default function Describer(props: DescriberProps) {
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
    navigator.clipboard.writeText(props.text);
    setShowClipSuccess(true);
  };
  useEffect(() => {
    if (showClipSuccess) {
      setTimeout(() => setShowClipSuccess(false), 5000);
    }
  });
  const onDiagramTypeChange = (value: string) => {
    switch (value) {
      case "mindMap":
        return props.onDiagramTypeChange("mindMap");
      case "sequenceDiagram":
      default:
        return props.onDiagramTypeChange("sequenceDiagram");
    }
  };
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
          id="describer"
          className={props.isVisible ? "" : "hide"}
          style={{
            width: boxState.width + "px",
            height: boxState.height + "px"
          }}
        >
          <div className="tools">
            <select
              id="diagramTypeSelect"
              value={props.diagramType}
              onChange={(e) => onDiagramTypeChange(e.target.value)}
            >
              <option value="sequenceDiagram">Sequence Diagram</option>
              <option value="mindMap">Mind Map</option>
            </select>
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
              value={props.text}
              basicSetup={false}
              extensions={createExtenstions(props.diagramType)}
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
