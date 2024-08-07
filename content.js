console.info("content.js loaded");


let keysPressd = {};
let isRendered = false;
let isDragging = false;
let offsetX, offsetY;

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

function initTextBox() {
    console.info("Init Textbox.");
    textbox.id = "draggable";
    textbox.contentEditable = "true";
    textbox.style.position = "absolute";
    textbox.style.textDecoration = "underline";
    textbox.style.width = "350px";
    textbox.style.height = "auto";
    textbox.style.border = "none";
    textbox.style.right = "10px";
    textbox.style.top = "10px";
    textbox.style.padding = "10px";
    textbox.style.zIndex = "999";
    textbox.style.overflowY = "hidden";
    textbox.style.resize = "none";
    textbox.style.cursor = "move";
    textbox.innerHTML = "ここにテキストを入力...";
    document.body.appendChild(textbox);
    adjustHeight();
}

// テキストボックスの移動機能
textbox.addEventListener("mousedown", function (e) {

    // 現在のleftとtopの位置を保持
    const rect = textbox.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

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