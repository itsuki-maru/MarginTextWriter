/**
 * Background Service Worker
 * 拡張機能アイコンのクリック時にcontent scriptへメッセージを送信する
 */
chrome.action.onClicked.addListener((tab) => {
  if (tab.id === undefined) return;
  chrome.tabs.sendMessage(tab.id, { type: 'toggle_textbox' });
});
