/**
 * ショートカットキーコンポーザブル
 * コンテナ要素のkeydownイベントをリッスンし、Ctrl+Shift+キーの組み合わせで各操作を実行する
 *
 * キーマッピング:
 *   B: フォントサイズ拡大
 *   S: フォントサイズ縮小
 *   U: 下線切り替え
 *   L: 枠線切り替え
 *   A: 印刷調整
 *   D: テキストボックス削除
 */
import { onMounted, onUnmounted, type Ref } from "vue";

interface ShortcutActions {
  fontSizeUp: () => void;
  fontSizeDown: () => void;
  toggleUnderline: () => void;
  toggleBorder: () => void;
  adjustPrint: () => void;
  remove: () => void;
}

export function useKeyboardShortcuts(
  containerRef: Ref<HTMLElement | null>,
  actions: ShortcutActions,
): void {
  /** Ctrl+Shift+キー と アクションの対応表 */
  const map: Record<string, () => void> = {
    B: actions.fontSizeUp,
    S: actions.fontSizeDown,
    U: actions.toggleUnderline,
    A: actions.adjustPrint,
    D: actions.remove,
    L: actions.toggleBorder,
  };

  function onKeyDown(event: KeyboardEvent): void {
    if (!event.ctrlKey || !event.shiftKey) return;

    const handler = map[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  }

  onMounted(() => {
    const el = containerRef.value;
    if (el) el.addEventListener("keydown", onKeyDown);
  });

  // コンポーネント破棄時にリスナーを解除
  onUnmounted(() => {
    const el = containerRef.value;
    if (el) el.removeEventListener("keydown", onKeyDown);
  });
}
