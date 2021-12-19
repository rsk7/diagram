import "./App.css";
import SequenceDescriber from "./components/SequenceDescriber";
import sequenceDiagramLayout from "./diagram/layout/SequenceDiagramLayout";
import GithubLogo from "./GitHub-Mark-32px.png";
import { ReactComponent as TextIcon } from "./bootstrap-icons/card-text.svg";
import Downloader from "./components/downloader";
import SequenceDiagramComponent from "./components/SequenceDiagram/SequenceDiagram";
import { useAppReducer } from "./AppReducer";
import FileManager from "./components/FileManager";

function App() {
  const { appState, dispatch } = useAppReducer();
  const layout = sequenceDiagramLayout(appState.diagram);
  return (
    <div className="App">
      <a id="github" href="https://github.com/rsk7/diagram">
        <img src={GithubLogo} alt="Github" />
      </a>
      <FileManager
        currentGUID={appState.fileGUID}
        files={appState.files}
        onFileClick={(guid: string) =>
          dispatch({ type: "changeCurrentFile", data: guid })
        }
        onNewFileClick={() => dispatch({ type: "newFile" })}
      />
      <div id="tools">
        <TextIcon
          id="textIcon"
          className="tool"
          onClick={() => dispatch({ type: "toggleCloseState" })}
        />
        <Downloader
          svgIdSelector="mainDiagram"
          type="png"
          layoutHeight={layout.layoutHeight}
          layoutWidth={layout.layoutWidth}
          diagramStartY={layout.diagramStartY}
          fileName={layout.title?.text.replace(/\s/g, "_")}
        />
      </div>
      <SequenceDiagramComponent {...layout} />
      <SequenceDescriber
        isVisible={appState.showSequenceDescriber}
        sequenceText={appState.text}
        smartTextOn={appState.smartTextEnabled}
        onSmartTextToggle={() => dispatch({ type: "toggleSmartText" })}
        onChange={(text) => dispatch({ type: "setSequenceText", data: text })}
        onClose={() => dispatch({ type: "toggleCloseState" })}
        onDelete={() => {
          if (window.confirm("Are you sure?")) {
            dispatch({ type: "delete" });
          }
        }}
      />
    </div>
  );
}

export default App;
