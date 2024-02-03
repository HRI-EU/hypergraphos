HyperGraph Help:
 - TextEditor - Toogle word-wrap - Win: Alt-Z', Mac: 'Option-Z
 - Toogle "Zoom To Fit" - "Zoom Back" : Shift-Z or 1
 - Zoom In: 2, 3, 4, 5
 - Zoom to selected node: CTRL-2, CTRL-3,  CTRL-4, CTRL-5
 - Center graph to selected node: C or Space
## Copy graph source from console
 - Select thread
 - JSON.parse( Diagram_getSource() )
 Then right clic and select: Copy object
## YAML
 jsyaml.load( '- one\n- two' );
 jsyaml.dump( [ 'one','two' ] )
## Component properties
 isPopup: true
 "fileURL": "http://www.youtube.com/embed/QQ2QOPWZKVc",
 "isIncludeScript": true,
 Link node: "linkToKey": 34
 Font:
     "font": "175px sans-serif"
     "fontColor": "GoldenRod" (On Text Label)
    "labelFont": "17px sans-serif"
 GraphInfo: label@3, date@system, graphPath@system
 