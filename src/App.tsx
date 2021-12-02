import "./App.css";
import Lifeline from "./Lifeline";

function App() {
  return (
    <svg>
      <Lifeline x={200} y={200} name={"Actor A"} />
      <Lifeline x={600} y={200} name={"Actor B"} />
    </svg>
  );
}

export default App;
