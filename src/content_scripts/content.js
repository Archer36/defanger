document.addEventListener("selectionchange", ()=> {
    indicatorParser = new IndicatorParser();

  let selectedText;
  if (document.activeElement.tagName === 'TEXTAREA') {
    // https://stackoverflow.com/a/74602959 - getSelection() doesn't work in TEXTAREAS
    // console.log("TEXTAREA selection");
    selectedText = document.activeElement.value.substring(
      document.activeElement.selectionStart,
      document.activeElement.selectionEnd
    );
  } else {
    // console.log("Normal selection")
    selectedText = document.getSelection().toString().trim();
  }
  console.log(selectedText);

  if (selectedText) {
    type = indicatorParser.getIndicatorType(selectedText);
    browser.runtime.sendMessage({
      id: 0,
      type: type,
      indicator: selectedText});
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
