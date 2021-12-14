export const exampleText = `SEQUENCE DIAGRAMS
=================

This is a tool that draws simple sequence diagrams. The diagrams are described in text using a simple language. To create a diagram start by defining some "actors" and some interactions between them.

Remove the "#" character to start drawing.

#actors: user, computer, server
#
#user -- opens browser --> computer
#computer -- sends request --> server
#server -- sends response --> computer
#computer -- shows page --> user

The diagram is being drawn in an SVG element. You can move it around by dragging it. Scroll up or down to zoom. This text box can also be moved using the move button on the top right and resized using the handle on the bottom right corner.

Additional actors can be specified anywhere in the text. The actors description must always be in a new line. Spacing between actors can be configured using special syntax. For example: db|sp(x) will space out the next actor from db by x units. Try different values in the line below.

#actors: db|sp(2), data warehouse
#
#server -- saving data --> db
#user -- thinking --> user
#server -- working --> server
#db -- sends data for aggregation --> data warehouse

The lightbulb icon on the top controls whether actor names are replaced automatically throughout this text when an actor line is updated. It defaults to off. Try turning it on and changing the name of an actor in a line that begins with "actors:".

`;
