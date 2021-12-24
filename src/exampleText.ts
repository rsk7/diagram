export const exampleText = `Sequence Diagram
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

`;

const REFRESH_EXAMPLE_GUID = "2df39b83-30d1-4f8f-8479-b4f692d25972";
export const EXAMPLE_GUID = "27e67be2-598c-49df-85c2-3a8942088cbe";

if (
  !localStorage.getItem(EXAMPLE_GUID) ||
  localStorage.getItem("refreshExampleGUID") !== REFRESH_EXAMPLE_GUID
) {
  localStorage.setItem(EXAMPLE_GUID, exampleText);
  localStorage.setItem("refreshExampleGUID", REFRESH_EXAMPLE_GUID);
  const files = JSON.parse(localStorage.getItem("files") || "[]");
  const exampleFile = files.find(
    (f: { guid: string }) => f.guid === EXAMPLE_GUID
  );
  if (!exampleFile) {
    files.push({
      fileName: "Example",
      guid: EXAMPLE_GUID
    });
    localStorage.setItem("files", JSON.stringify(files));
    localStorage.setItem("currentGUID", EXAMPLE_GUID);
  }
}
