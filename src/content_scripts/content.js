document.addEventListener("selectionchange", ()=> {
    indicatorParser = new IndicatorParser();

    let selectedText = document.getSelection().toString().trim();

    if (selectedText) {
        type = indicatorParser.getIndicatorType(selectedText);
        console.log(type);
        browser.runtime.sendMessage({
            id: 0,
            type: type
        });

    }
});
