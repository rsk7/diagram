import { DiagramFile, DiagramType } from "./AppState";

export const sequenceExampleText = `Sequence Diagram
=================

This is a tool that draws simple sequence diagrams. The diagrams are described in text using a simple language. To create a diagram start by defining some "actors" and some interactions between them.

actors: user
Someone who has access to a computer.

actor: computer, server
Server needs to be online.

user -- opens browser --> computer

computer -- sends request --> server
Computer does a great job sending the request.

server -- sends response --> computer
computer -- shows page --> user

The diagram is being drawn in an SVG element. You can move it around by dragging it. Scroll up or down to zoom. This text box can also be moved using the move button on the top right and resized using the handle on the bottom right corner.

Additional actors can be specified anywhere in the text. The actors description must always be in a new line. Spacing between actors can be configured using special syntax. For example: db|sp(x) will space out the next actor from db by x units. Try different values in the line below.

Remove the "#" character to start drawing.

#actors: db|sp(2), data warehouse
#
#server -- saving data --> db
#user -- thinking --> user
#server -- working --> server
#db -- sends data for aggregation --> data warehouse

Use [Ctrl or Cmd] + F to find and replace.

This editor is codemirror.net/6 used in React via https://uiwjs.github.io/react-codemirror/.

`;

const mapExampleText = `Map Title
====

From Tree - Wikipedia.

=In botany, a tree is a perennial plant with an elongated stem, or trunk, usually supporting branches and leaves.
-Leaves
-Trunk
-Root

=Trunk
-The main purpose of the trunk is to raise the leaves above the ground, enabling the tree to overtop other plants and outcompete them for light.

=Root
-The roots of a tree serve to anchor it to the ground and gather water and nutrients to transfer to all parts of the tree.

=Leaves
-Leaves are structures specialised for photosynthesis and are arranged on the tree in such a way as to maximise their exposure to light without shading each other.
- evergreen

`;

const REFRESH_EXAMPLE_GUID = "2df39b83-30d1-4f8f-8479-b4f692d25979";
export const EXAMPLE_GUID = "27e67be2-598c-49df-85c2-3a8942088cbe";
export const MAP_EXAMPLE_GUID = "cde8785f-43a7-4496-8364-5dd7529829d1";

function setExample(
  files: DiagramFile[],
  guid: string,
  fileName: string,
  fileType: DiagramType
) {
  const exampleFile = files.find((f: { guid: string }) => f.guid === guid);
  console.log(exampleFile);
  if (!exampleFile) {
    files.push({
      fileName,
      guid,
      fileType
    });
  }
}

if (
  !localStorage.getItem(MAP_EXAMPLE_GUID) ||
  !localStorage.getItem(EXAMPLE_GUID) ||
  localStorage.getItem("refreshExampleGUID") !== REFRESH_EXAMPLE_GUID
) {
  localStorage.setItem(MAP_EXAMPLE_GUID, mapExampleText);
  localStorage.setItem(EXAMPLE_GUID, sequenceExampleText);
  localStorage.setItem("refreshExampleGUID", REFRESH_EXAMPLE_GUID);
  const files: DiagramFile[] = JSON.parse(
    localStorage.getItem("files") || "[]"
  );
  setExample(files, EXAMPLE_GUID, "Sequence Example", "sequenceDiagram");
  setExample(files, MAP_EXAMPLE_GUID, "Map Example", "mindMap");
  localStorage.setItem("files", JSON.stringify(files));
  localStorage.setItem("currentGUID", EXAMPLE_GUID);
}
