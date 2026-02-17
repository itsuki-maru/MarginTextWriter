/**
 * ドラッグ操作コンポーザブル
 * 要素のmousedownイベントからドラッグを開始し、position(座標)を更新する
 */
import { onUnmounted, type Ref } from 'vue';

interface Position {
  x: number;
  y: number;
}

export function useDrag(position: Ref<Position>) {
  /** ドラッグ開始時のマウス位置と要素左上の差分 */
  let offsetX = 0;
  let offsetY = 0;

  /** マウス移動時に位置を更新 */
  function onMouseMove(event: MouseEvent): void {
    position.value.x = event.clientX - offsetX;
    position.value.y = event.clientY - offsetY;
  }

  /** マウスボタン離し時にリスナーを解除 */
  function onMouseUp(): void {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  /** ドラッグ開始: オフセットを計算しリスナーを登録 */
  function onDragStart(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  }

  // コンポーネント破棄時にリスナーをクリーンアップ
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  });

  return { onDragStart };
}
