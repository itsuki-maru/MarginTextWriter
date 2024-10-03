console.info("content.js loaded");


let keysPressd = {};
let isRendered = false;
let isDragging = false;
let offsetX, offsetY;
let defaultFonxSize = 14;
let isUnderLineDraw = true;

const textbox = document.createElement("div");

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
    textbox.style.width = "450px";
    textbox.style.height = "auto";
    textbox.style.border = "none";
    textbox.style.right = "100px";
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