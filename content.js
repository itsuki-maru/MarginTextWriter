console.info("Margin Text Writer loaded.");


let keysPressd = {};
let isRendered = false;
let isDragging = false;
let callAdjustPrintPage = false;
let offsetX, offsetY;
let defaultFonxSize = 14;
let isUnderLineDraw = true;

const textbox = document.createElement("div");
const bodyElement = document.body;

document.addEventListener("keydown", function (event) {
    keysPressd[event.key] = true;
    if (keysPressd["m"] && keysPressd["t"]) {
        if (!isRendered) {
            initTextBox();
            isRendered = true;
        }
    }
});

function initTextBox () {
    console.info("Init Textbox.");
    textbox.id = "draggable";
    textbox.contentEditable = "true";
    textbox.style.position = "absolute";
    textbox.style.textDecoration = "underline";
    textbox.style.textUnderlineOffset = "5px";
    textbox.style.width = "400px";
    textbox.style.height = "auto";
    textbox.style.border = "none";
    textbox.style.left = "50px";
    textbox.style.top = "20px";
    textbox.style.padding = "10px";
    textbox.style.zIndex = "999";
    textbox.style.overflowY = "hidden";
    textbox.style.resize = "none";
    textbox.style.cursor = "move";
    textbox.style.fontSize = `${defaultFonxSize}px`;
    textbox.innerHTML = "ここにテキストを入力...";
    document.body.appendChild(textbox);
    adjustHeight();
}

// テキストボックスの移動機能
textbox.addEventListener("mousedown", function (event) {
    // 現在のleftとtopの位置を保持
    const rect = textbox.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
});

textbox.addEventListener("input", function() {
    adjustHeight();
})

function onMouseMove(event) {
    textbox.style.left = `${event.clientX - offsetX}px`;
    textbox.style.top = `${event.clientY - offsetY}px`;
}

function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

function adjustHeight() {
    textbox.style.height = "auto";
    textbox.style.height = textbox.scrollHeight + "px";
}

// Bodyの高さを調整
function adjustPortlatePrintSize() {
    if (callAdjustPrintPage) {
        return;
    }
    bodyElement.style.height = "1123px";
    bodyElement.style.width = "794px";
    bodyElement.style.margin = "5px";
    bodyElement.style.padding = "3px";
    bodyElement.style.border = "1px solid";
    removeTextbox();
    initTextBox ();
    console.info("Adjust Body Height.");
    window.alert("画面を印刷サイズに調整しました。");
    callAdjustPrintPage = true;

    const style = document.createElement("style");
    style.textContent = `
        @media print {
            body {
                border: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

textbox.addEventListener("keydown", function (event) {
    if (document.activeElement === textbox) {
        if (event.ctrlKey && event.shiftKey && event.key === "B") {
            event.preventDefault();
            fontSizeUp();
            return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "S") {
            event.preventDefault();
            fontSizeDown();
            return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "U") {
            event.preventDefault();
            switchUnderLine();
            return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "A") {
            event.preventDefault();
            adjustPortlatePrintSize();
            return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "D") {
            event.preventDefault();
            removeTextbox();
            return;
        }
    }
})

function fontSizeUp () {
    defaultFonxSize += 1;
    textbox.style.fontSize = `${defaultFonxSize}px`;
};

function fontSizeDown () {
    defaultFonxSize -= 1;
    textbox.style.fontSize = `${defaultFonxSize}px`;
};

function switchUnderLine () {
    if (isUnderLineDraw) {
        textbox.style.textDecoration = "none";
        isUnderLineDraw = false;
    } else {
        textbox.style.textDecoration = "underline";
        isUnderLineDraw = true;
    }
};

function removeTextbox() {
    const deleteTextbox = document.getElementById("draggable")
    deleteTextbox.remove();
    isRendered = false;
}