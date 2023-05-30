var indicator = "";
var indicatorParser = new IndicatorParser();

/**
* Create context menu
*/
browser.contextMenus.create({
    id: "defang_copy",
    title: "Defang and copy",
    contexts: ["selection"],
    visible: false,
});
browser.contextMenus.create({
    id: "refang_copy",
    title: "Refang and copy",
    contexts: ["selection"],
    visible: false,
});
browser.contextMenus.create({
    id: "defang_paste",
    title: "Defang and paste",
    contexts: ["editable"],
    visible: true,
});
browser.contextMenus.create({
    id: "refang_paste",
    title: "Refang and paste",
    contexts: ["editable"],
    visible: true,
});


/**
* The click event listener, where we perform the appropriate action given the
* ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "defang_copy":
        let defanged = indicatorParser.defangIndicator(indicator);
        navigator.clipboard.writeText(defanged);
        break;
    case "refang_copy":
        let refanged = indicatorParser.refangIndicator(indicator);
        navigator.clipboard.writeText(refanged);
        break;
    case "defang_paste":
          navigator.clipboard.readText().then((clipboardText) => {
              let modifiedText = indicatorParser.defangIndicator(clipboardText);
              browser.tabs.sendMessage(tab.id, { text: modifiedText });
          });
        break;
    case "refang_paste":
          navigator.clipboard.readText().then((clipboardText) => {
              let modifiedText = indicatorParser.refangIndicator(clipboardText);
              browser.tabs.sendMessage(tab.id, { text: modifiedText });
          });
        break;
  }
});


browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.id == 0) {
        indicator = request.indicator;
        let visible = {
            "defanged": request.type === "defanged",
            "refanged": request.type === "refanged"
        }
        browser.contextMenus.update("refang_copy", {
            visible: visible['defanged']
        });
        browser.contextMenus.update("defang_copy", {
            visible: visible['refanged']
        });
    }
});
