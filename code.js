// Borders from the Snapblocks team
// Figma plugin that add independent borders to each side of a FRAME element with constraints.
// https://github.com/snapblocks/figma-plugin-borders
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// NOTE: resizing the ui window for plugin
figma.ui.resize(300, 0);
// check for current selected element
var checkSelection = function () {
    var elem = null;
    var kind = null;
    if (figma.currentPage.selection.length) {
        elem = figma.currentPage.selection[0];
        kind = figma.currentPage.selection[0].type;
    }
    figma.ui.postMessage({ type: 'selectionChange', elem: elem, kind: kind });
};
// call for first time plugin loads
checkSelection();
// check everytime user selects something in Figma
figma.on('selectionchange', function () {
    checkSelection();
});
// message from ui to figma sandbox
figma.ui.onmessage = function (msg) {
    var line = figma.createLine();
    var selected = figma.currentPage.selection[0];
    // append line to document
    figma.currentPage.appendChild(line);
    //place line inside frame element
    selected.appendChild(line);
    // change line default properties based on option selected
    if (msg.type === 'border-bottom') {
        line.name = "--border-bottom";
        line.resize(selected.width, line.height);
        line.y = selected.height;
        line.constraints = {
            horizontal: "STRETCH",
            vertical: "MIN"
        };
    }
    if (msg.type === 'border-right') {
        line.name = "--border-right";
        line.resize(selected.height, line.height);
        line.rotation = 90;
        line.x = selected.width;
        line.y = selected.height;
        line.constraints = {
            horizontal: "MAX",
            vertical: "STRETCH"
        };
    }
    if (msg.type === 'border-top') {
        line.name = "--border-top";
        line.resize(selected.width, line.height);
        line.y = 1; // might replace based on dynamic size generator in future release
        line.constraints = {
            horizontal: "STRETCH",
            vertical: "MIN"
        };
    }
    if (msg.type === 'border-left') {
        line.name = "--border-left";
        line.resize(selected.height, line.height);
        line.rotation = 90;
        line.x = 1; // might replace based on dynamic size generator in future release
        line.y = selected.height;
        line.constraints = {
            horizontal: "MIN",
            vertical: "STRETCH"
        };
    }
    // applying custom color to stroke
    line.strokes = [{
            type: "SOLID",
            visible: true,
            opacity: 1,
            blendMode: "NORMAL",
            color: {
                r: 0.8078431487083435,
                g: 0.8313725590705872,
                b: 0.8549019694328308
            }
        }];
    // figma.closePlugin();
};
