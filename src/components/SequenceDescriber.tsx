interface SequenceDescriberProps {
  sequenceText: string;
  onChange: (sequnenceText: string) => void;
}

export default function SequenceDescriber(props: SequenceDescriberProps) {
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
    background: "rgba(224, 224, 224, 0.2)"
  };
  return (
    <div style={styles}>
      <textarea
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
        onChange={(e) =>
          props.onChange((e.target as HTMLTextAreaElement).value)
        }
      ></textarea>
    </div>
  );
}
