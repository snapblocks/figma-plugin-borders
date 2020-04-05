// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// NOTE: resizing the ui window for plugin
// figma.ui.resize(300,500)
// verify if selection has correct type to apply border
var correctType = function () {
    var elem = figma.currentPage.selection[0]; // get first element on selection
    // return (elem.type === 'RECTANGLE' || elem.type === 'FRAME') ? true : false;
    return (elem.type === 'FRAME') ? true : false;
};
figma.on('selectionchange', function () {
    if (figma.currentPage.selection.length) {
        var elem = figma.currentPage.selection[0];
        var kind = figma.currentPage.selection[0].type;
        figma.ui.postMessage({ type: 'selectionChange', elem: elem, kind: kind });
    }
    else {
        var elem = null;
        figma.ui.postMessage({ type: 'selectionChange', elem: elem });
    }
});
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = function (msg) {
    var selected = figma.currentPage.selection;
    if (msg.type === 'border-bottom' && selected.length && correctType()) {
        console.log(figma.currentPage.selection[0].parent.type);
        var line = figma.createLine();
        line.x = 100;
    }
    else {
        console.log("select correct node");
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};
