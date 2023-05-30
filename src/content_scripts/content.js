document.addEventListener("selectionchange", ()=> {
    indicatorParser = new IndicatorParser();

    let selectedText = document.getSelection().toString().trim();

    if (selectedText) {
        type = indicatorParser.getIndicatorType(selectedText);
        browser.runtime.sendMessage({
            id: 0,
            type: type,
            indicator: selectedText
        });

    }
});


browser.runtime.onMessage.addListener((message) => {
  if (message.text) {
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.value = message.text;
    }
  }
});
