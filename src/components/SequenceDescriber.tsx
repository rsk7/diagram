import { useEffect, useRef } from "react";

interface SequenceDescriberProps {
  sequenceText: string;
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
  const styles = {
    height: "85vh",
    width: "25vw",
    minWidth: "300px",
    display: "block",
    position: "absolute" as const,
    top: "0px",
    margin: "30px",
    padding: "20px",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    background: "rgba(255, 255, 255, 0.8)"
  };
  return (
    <div style={styles}>
      <textarea
        ref={textAreaRef}
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          border: "none",
          outline: "none",
          resize: "none",
          backgroundColor: "transparent"
        }}
        value={props.sequenceText}
        onChange={(e) => {
          selectionEndRef.current = e.target.selectionEnd;
          props.onChange(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
