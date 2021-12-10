export const exampleText = `SEQUENCE DIAGRAMS
=================

Draws sequence diagrams with a simple language. Everything supported is shown below.

Remove "#" character from start of line to render examples.


EXAMPLE 1:
Simple diagram showing three entities.

#actors: user, computer, server
#
#user -- does something --> computer
#computer -- asks server --> server
#server -- confirms to computer --> computer
#computer -- shows results --> user


EXAMPLE 2:
Adding more entities to the same diagram with optional spacing. db{sp:(1|2)} adds 1 unit or spacing to the left and 2 units of spacing to the right.

#actors: db{sp(2)}, queue
#
#server -- check db --> db
#server -- add to queue --> queue


Try changing the name of one of the actors. All active references are updated.

To save as image, click the camera icon on the top right of this text box.
`;
