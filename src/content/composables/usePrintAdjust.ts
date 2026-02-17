/**
 * 印刷調整コンポーザブル
 * 横長のWebページをA4縦印刷用のサイズに調整する
 * 調整は1回のみ実行可能（callAdjustPrintPageフラグで制御）
 */
import { ref } from 'vue';

type EmitFn = (event: 'requestReinit') => void;

export function usePrintAdjust(emit: EmitFn) {
  /** 調整済みフラグ（2回目以降の実行を防止） */
  const callAdjustPrintPage = ref(false);

  function adjustPrint(): void {
    if (callAdjustPrintPage.value) return;

    const bodyElement = document.body;
    const bodyHeight = bodyElement.scrollHeight;

    // A4縦の高さ（96dpi: 1123px）に満たない場合はA4の高さに設定
    if (bodyHeight < 1123) {
      bodyElement.style.height = '1123px';
    } else {
      bodyElement.style.height = 'auto';
    }
    // A4縦の幅（96dpi: 794px）に設定
    bodyElement.style.width = '794px';
    bodyElement.style.margin = '5px';
    bodyElement.style.padding = '3px';
    bodyElement.style.border = '1px solid';

    callAdjustPrintPage.value = true;
    window.alert('画面を印刷サイズに調整しました。');

    // テキストボックスの再初期化を要求
    emit('requestReinit');
  }

  return { adjustPrint };
}
