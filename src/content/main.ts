/**
 * Content Script エントリポイント
 * ページ上でM+Tキーを同時押しするとテキストボックスを生成する
 * Shadow DOMを使用してホストページとのスタイル分離を行う
 */
import { createApp } from 'vue';
import App from './App.vue';
// ?inline でCSSを文字列として取得（Shadow DOM内に<style>として注入するため）
import contentCss from './styles/content.css?inline';

console.info('Margin Text Writer loaded.');

/** キー入力の押下状態を保持 */
const keysPressed: Record<string, boolean> = {};
/** テキストボックスの表示状態 */
let isRendered = false;

// M+Tキー同時押しでテキストボックスを表示
document.addEventListener('keydown', (event: KeyboardEvent) => {
  keysPressed[event.key] = true;

  if (keysPressed['m'] && keysPressed['t']) {
    if (!isRendered) {
      // "t"がテキストボックスに入力されるのを防止
      event.preventDefault();
      mountTextBox();
      isRendered = true;
    }
  }
});

document.addEventListener('keyup', (event: KeyboardEvent) => {
  keysPressed[event.key] = false;
});

/**
 * テキストボックスをマウントする
 * Shadow DOMを作成し、その中にVueアプリをマウントする
 */
function mountTextBox(): void {
  // Shadow DOMのホスト要素を作成
  const host = document.createElement('div');
  document.body.appendChild(host);

  const shadowRoot = host.attachShadow({ mode: 'open' });

  // CSSをShadow DOM内に注入
  const style = document.createElement('style');
  style.textContent = contentCss;
  shadowRoot.appendChild(style);

  // Vueアプリのマウントポイント
  const mountPoint = document.createElement('div');
  shadowRoot.appendChild(mountPoint);

  const app = createApp(App, {
    // テキストボックス破棄時のコールバック
    destroyCallback: () => {
      app.unmount();
      host.remove();
      isRendered = false;
      keysPressed['m'] = false;
      keysPressed['t'] = false;
    },
  });

  app.mount(mountPoint);
  console.info('Textbox initialized.');
}
