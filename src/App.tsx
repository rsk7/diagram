import "./App.css";
import Describer from "./components/Describer";
import GithubLogo from "./GitHub-Mark-32px.png";
import { ReactComponent as TextIcon } from "./bootstrap-icons/card-text.svg";
import Downloader from "./components/downloader";
import { useAppReducer } from "./AppReducer";
import FileManager from "./components/FileManager";
import DiagramComponentFactory from "./DiagramComponentFactory";
import { useEffect } from "react";

function App() {
  const { appState, dispatch } = useAppReducer();
  const { layout, diagramComponent } = DiagramComponentFactory(
    appState.text,
    appState.fileType
  );
  useEffect(() => {
    dispatch({
      type: "renameFile",
      data: layout.title?.text || appState.fileName
    });
  }, [appState.text, appState.fileName, layout.title?.text, dispatch]);
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
      {diagramComponent}
      <Describer
        isVisible={appState.showDescriber}
        text={appState.text}
        onChange={(text) => dispatch({ type: "setText", data: text })}
        onClose={() => dispatch({ type: "toggleCloseState" })}
        onDelete={() => {
          if (window.confirm("Are you sure?")) {
            dispatch({ type: "delete" });
          }
        }}
        type={"sequenceDiagram"}
      />
    </div>
  );
}

export default App;
