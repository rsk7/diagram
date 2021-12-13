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

Additional actors can be specified anywhere in the text. The actors description must always be in a new line. Duplicate actor names are ignored.

#actors: user, db, data warehouse
#
#server -- saving data --> db
#user -- thinking --> user
#server -- doing server work --> server
#db -- sends data for aggregation --> data warehouse


Spacing between actors can be configured using special syntax. user{sp(x)} will space out the next actor from user by x units. Try different values in the line below.

#actors: user{sp(2.6)}, server{sp(2)}
`;
