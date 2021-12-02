import "./App.css";
import Lifeline from "./Lifeline";
import SequenceDescriber from "./SequenceDescriber";
import { useState } from "react";
import SequenceReader from "./SequenceReader";

function App() {
  const [sequenceText, setSequenceText] = useState("");
  const [actors, setActors] = useState<string[]>([]);
  const sequenceChange = (text: string) => {
    const sd = SequenceReader(text);
    setActors((arr) => [...sd.actors]);
    setSequenceText(text);
  };

  // temp
  const start = 500;
  const width = 200;

  return (
    <div className="App">
      <svg>
        {actors.map((a, index) => (
          <Lifeline x={start + index * width} y={200} name={a} />
        ))}
      </svg>
      <SequenceDescriber
        sequenceText={sequenceText}
        onChange={sequenceChange}
      />
    </div>
  );
}

export default App;
