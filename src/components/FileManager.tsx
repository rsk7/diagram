import "./FileManager.css";
import { ReactComponent as PlusIcon } from "../bootstrap-icons/plus-lg.svg";
import { DiagramFile } from "../AppState";
import ReactDOM from "react-dom";
import { ReactComponent as TrashIcon } from "../bootstrap-icons/trash.svg";
import { useState } from "react";
import { EXAMPLE_GUID, MAP_EXAMPLE_GUID } from "../exampleText";

interface FileManagerProps {
  files: DiagramFile[];
  currentGUID: string;
  onFileClick: (guid: string) => void;
  onNewFileClick: () => void;
  onDeleteFileClick: (guid: string) => void;
}

const examples = ({
  fileClick,
  examples
}: {
  fileClick: (guid: string) => void;
  examples: DiagramFile[];
}) => {
  return ReactDOM.createPortal(
    <div className="examples">
      Examples:
      {!!examples.length &&
        examples.map((f) => (
          <div className="file" key={f.guid} onClick={() => fileClick(f.guid)}>
            {f.fileName}
          </div>
        ))}
    </div>,
    document.body
  );
};

const fileOptions = ({
  isOpen,
  files,
  currentFile,
  fileClick,
  deleteFileClick
}: {
  isOpen: boolean;
  files: DiagramFile[];
  currentFile?: DiagramFile;
  fileClick: (guid: string) => void;
  deleteFileClick: (guid: string) => void;
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal file-options">
      {files.map((f: DiagramFile) => (
        <div key={f.guid}>
          <div
            className={`file ${f.guid === currentFile?.guid ? "current" : ""}`}
            onClick={() => fileClick(f.guid)}
          >
            {f.fileName}
          </div>
          <TrashIcon
            className="tool"
            onClick={() => deleteFileClick(f.guid)}
          ></TrashIcon>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default function FileManager(props: FileManagerProps) {
  const [showOptions, toggleShowOptions] = useState(false);
  const currentFile = props.files.find((f) => f.guid === props.currentGUID);
  const modal = fileOptions({
    isOpen: showOptions,
    fileClick: (guid: string) => {
      toggleShowOptions(!showOptions);
      props.onFileClick(guid);
    },
    files: props.files,
    currentFile,
    deleteFileClick: props.onDeleteFileClick
  });
  const exampleFiles = props.files.filter((f) =>
    new Set([EXAMPLE_GUID, MAP_EXAMPLE_GUID]).has(f.guid)
  );
  const info = examples({
    fileClick: props.onFileClick,
    examples: exampleFiles
  });
  return (
    <div id="files">
      {modal}
      {window.innerWidth > 700 && !!exampleFiles.length && info}
      <div
        className="file current"
        onClick={() => toggleShowOptions(!showOptions)}
      >
        {currentFile?.fileName}
      </div>
      <PlusIcon className="tool" onClick={props.onNewFileClick} />
    </div>
  );
}
