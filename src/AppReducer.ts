import SequenceReader from "./diagram/parser/SequenceReader";
import AppState from "./AppState";
import { v4 as uuidv4 } from "uuid";
import { exampleText, EXAMPLE_GUID } from "./exampleText";
import { useEffect, useReducer } from "react";

function setSequenceText(currState: AppState, text: string): AppState {
  const previousText = currState.text;
  const newSequenceState = SequenceReader(text, {
    enableSmartText: currState.smartTextEnabled ? { previousText } : undefined
  });
  return renameFile(
    {
      ...currState,
      ...newSequenceState
    },
    currState.fileGUID,
    newSequenceState.diagram.title || currState.fileName
  );
}

function renameFile(state: AppState, guid: string, newName: string): AppState {
  const files = state.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].guid === guid) {
      files[i].fileName = newName;
    }
  }
  return {
    ...state,
    files: [...files]
  };
}

function toggleSmartText(currState: AppState): AppState {
  return {
    ...currState,
    smartTextEnabled: !currState.smartTextEnabled
  };
}

function toggleCloseState(currState: AppState): AppState {
  return {
    ...currState,
    showSequenceDescriber: !currState.showSequenceDescriber
  };
}

export function initState(): AppState {
  const currentGUID = localStorage.getItem("currentGUID");
  if (!currentGUID) localStorage.setItem("currentGUID", EXAMPLE_GUID);
  const currentFileGUID: string = localStorage.getItem("currentGUID") || "";
  const files: { guid: string; fileName: string }[] = JSON.parse(
    localStorage.getItem("files") || "[]"
  );
  const currentFile = files.find((f) => f.guid === currentFileGUID);
  const currentFileText = localStorage.getItem(currentFileGUID) || "";
  return {
    fileName: currentFile?.fileName || "",
    fileGUID: currentFile?.guid || "",
    text: currentFileText,
    diagram: SequenceReader(currentFileText).diagram,
    smartTextEnabled: false,
    showSequenceDescriber: true,
    files
  };
}

function createNewFile(state: AppState): AppState {
  const fileName = "Untitled";
  const guid = uuidv4();
  return {
    ...state,
    fileName,
    fileGUID: guid,
    text: "",
    diagram: SequenceReader("").diagram,
    files: [...state.files, { fileName, guid }]
  };
}

function changeCurrentFile(state: AppState, guid: string): AppState {
  const file = state.files.find((f) => f.guid === guid);
  if (!file) throw new Error("Can't find file");
  const text = localStorage.getItem(guid) || "";
  return {
    ...state,
    fileName: file.fileName,
    fileGUID: guid,
    text,
    diagram: SequenceReader(text).diagram
  };
}

function deleteFile(state: AppState): AppState {
  localStorage.removeItem(state.fileGUID);
  const files = [...state.files.filter((f) => f.guid !== state.fileGUID)];
  if (!files.length) {
    return createNewFile({
      ...state,
      files
    });
  } else {
    return changeCurrentFile(
      {
        ...state,
        files
      },
      files[0]?.guid || ""
    );
  }
}

export function AppReducer(
  state: AppState,
  action: { type: string; data?: unknown }
): AppState {
  switch (action.type) {
    case "setSequenceText":
      return setSequenceText(state, action.data as string);
    case "toggleSmartText":
      return toggleSmartText(state);
    case "toggleCloseState":
      return toggleCloseState(state);
    case "newFile":
      return createNewFile(state);
    case "changeCurrentFile":
      return changeCurrentFile(state, action.data as string);
    case "delete":
      return deleteFile(state);
    default:
      return state;
  }
}

export function useAppReducer() {
  const [appState, dispatch] = useReducer(AppReducer, {}, initState);
  useEffect(() => {
    localStorage.setItem("currentGUID", appState.fileGUID);
    localStorage.setItem(appState.fileGUID, appState.text);
    localStorage.setItem("files", JSON.stringify(appState.files));
  });
  return { appState, dispatch };
}
