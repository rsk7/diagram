import "./FileManager.css";
import { ReactComponent as PlusIcon } from "../bootstrap-icons/plus-lg.svg";

interface FileManagerProps {
  files: { guid: string; fileName: string }[];
  currentGUID: string;
  onFileClick: (guid: string) => void;
  onNewFileClick: () => void;
}

export default function FileManager(props: FileManagerProps) {
  return (
    <div id="files">
      {props.files.map((f) => (
        <div
          key={f.guid}
          className={`file ${f.guid === props.currentGUID ? "current" : ""}`}
          onClick={() => props.onFileClick(f.guid)}
        >
          {f.fileName}
        </div>
      ))}
      <PlusIcon className="tool" onClick={props.onNewFileClick} />
    </div>
  );
}