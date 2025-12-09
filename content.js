console.info("Margin Text Writer loaded.");

// 初期化
let keysPressd = {}; // キー入力の値を保持
let isRendered = false; // テキストボックスの挿入状況を保持
let isDragging = false; // テキストボックスのドラッグ状況を保持
let callAdjustPrintPage = false; // ページのアジャスト実行状態を保持
let offsetX, offsetY;  // テキストボックスの移動状況を保持
let defaultFonxSize = 14; // フォントサイズ初期値
let isUnderLineDraw = true; // 下線の有無

const textbox = document.createElement("div");
const bodyElement = document.body;


// テキストボックスの初期化
function initTextBox () {
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
    console.info("Textbox initialized.");
}


// テキストボックスの位置を保持
function onMouseMove(event) {
    textbox.style.left = `${event.clientX - offsetX}px`;
    textbox.style.top = `${event.clientY - offsetY}px`;
}


// テキストボックスのフォーカス状況を保持
function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}


// テキストボックスの高さを調整
function adjustHeight() {
    textbox.style.height = "auto";
    textbox.style.height = textbox.scrollHeight + "px";
}


// 横長のページをA4印刷用の高さに調整
function adjustPortlatePrintSize() {
    if (callAdjustPrintPage) {
        return;
    }
    const bodyHeight = document.body.scrollHeight;
    
    // 現在のページがA4以下ならページ下部の余白を得るためにA4の高さに設定
    if (bodyHeight < 1123) {
        bodyElement.style.height = "1123px";
    
    // 現在のページがA4以上なら2枚目となるため高さをautoに設定
    } else {
        bodyElement.style.height = "auto";
    }
    bodyElement.style.width = "794px";
    bodyElement.style.margin = "5px";
    bodyElement.style.padding = "3px";
    bodyElement.style.border = "1px solid";
    removeTextbox();
    initTextBox ();
    console.info("Adjust Body Height.");
    window.alert("画面を印刷サイズに調整しました。");
    callAdjustPrintPage = true;
}


// フォントサイズアップ
function fontSizeUp () {
    defaultFonxSize += 1;
    textbox.style.fontSize = `${defaultFonxSize}px`;
};


// フォントサイズダウン
function fontSizeDown () {
    defaultFonxSize -= 1;
    textbox.style.fontSize = `${defaultFonxSize}px`;
};


// アンダーラインの表示非表示切り替え
function switchUnderLine () {
    if (isUnderLineDraw) {
        textbox.style.textDecoration = "none";
        isUnderLineDraw = false;
    } else {
        textbox.style.textDecoration = "underline";
        isUnderLineDraw = true;
    }
};


// テキストボックスの除去
function removeTextbox() {
    const deleteTextbox = document.getElementById("draggable")
    deleteTextbox.remove();
    isRendered = false;
    keysPressd["m"] = false;
    keysPressd["t"] = false;
}


// テキストボックスのレンダリング制御
document.addEventListener("keydown", function (event) {
    keysPressd[event.key] = true;
    if (keysPressd["m"] && keysPressd["t"]) {
        if (!isRendered) {
            initTextBox();
            isRendered = true;
        }
    }
});


// テキストボックスの移動機能
textbox.addEventListener("mousedown", function (event) {
    // 現在のleftとtopの位置を保持
    const rect = textbox.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
});


// 入力に応じてテキストボックスの高さを随時調整
textbox.addEventListener("input", function() {
    adjustHeight();
});


// 各種ショートカットキーの追加
textbox.addEventListener("keydown", function (event) {
    if (document.activeElement === textbox) {
        // 文字サイズアップ
        if (event.ctrlKey && event.shiftKey && event.key === "B") {
            event.preventDefault();
            fontSizeUp();
            return;
        }
        // 文字サイズダウン
        if (event.ctrlKey && event.shiftKey && event.key === "S") {
            event.preventDefault();
            fontSizeDown();
            return;
        }
        // 下線の表示切り替え
        if (event.ctrlKey && event.shiftKey && event.key === "U") {
            event.preventDefault();
            switchUnderLine();
            return;
        }
        // 印刷用に画面アジャスト
        if (event.ctrlKey && event.shiftKey && event.key === "A") {
            event.preventDefault();
            adjustPortlatePrintSize();
            return;
        }
        // テキストボックスの削除
        if (event.ctrlKey && event.shiftKey && event.key === "D") {
            event.preventDefault();
            removeTextbox();
            return;
        }
    }
});
