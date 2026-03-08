<!--
  テキストボックスのメインコンポーネント
  ツールバーと編集エリアを束ね、ドラッグ移動・ショートカットキー・各操作を管理する
-->
<script setup lang="ts">
import { ref } from "vue";
import ToolBar from "./ToolBar.vue";
import EditableArea from "./EditableArea.vue";
import { useDrag } from "../composables/useDrag";
import { useKeyboardShortcuts } from "../composables/useKeyboardShortcuts";
import { usePrintAdjust } from "../composables/usePrintAdjust";

const emit = defineEmits<{
  /** テキストボックス削除 */
  remove: [];
  /** 印刷調整後の再初期化要求 */
  requestReinit: [];
}>();

// --- リアクティブ状態 ---
const fontSize = ref(14);
const isUnderline = ref(true);
/** 印刷時に枠線を表示するか（画面上は常に枠線表示） */
const printBorder = ref(false);
/** 文字色 */
const textColor = ref("black");
/** テキストボックスの位置（初期値: 画面右上） */
const position = ref({ x: window.innerWidth - 420, y: 20 });

const containerRef = ref<HTMLElement | null>(null);
const editableRef = ref<InstanceType<typeof EditableArea> | null>(null);

// --- コンポーザブル ---
const { onDragStart } = useDrag(position);
const { adjustPrint } = usePrintAdjust((event: "requestReinit") => emit(event));

// --- 操作メソッド ---
function fontSizeUp(): void {
  fontSize.value += 1;
}

function fontSizeDown(): void {
  fontSize.value -= 1;
}

function toggleUnderline(): void {
  isUnderline.value = !isUnderline.value;
}

/** 印刷時の枠線表示を切り替え */
function togglePrintBorder(): void {
  printBorder.value = !printBorder.value;
  if (printBorder.value) {
    window.alert("印刷時に枠線を表示します。");
  } else {
    window.alert("印刷時に枠線は非表示となります。");
  }
}

function changeTextColor(color: string): void {
  textColor.value = color;
}

// ショートカットキーの登録
useKeyboardShortcuts(containerRef, {
  fontSizeUp,
  fontSizeDown,
  toggleUnderline,
  toggleBorder: togglePrintBorder,
  adjustPrint,
  remove: () => emit("remove"),
});
</script>

<template>
  <div
    ref="containerRef"
    class="textbox-container"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @mousedown="onDragStart"
  >
    <ToolBar
      :fontSize="fontSize"
      :isUnderline="isUnderline"
      :printBorder="printBorder"
      :textColor="textColor"
      @fontSizeUp="fontSizeUp"
      @fontSizeDown="fontSizeDown"
      @toggleUnderline="toggleUnderline"
      @togglePrintBorder="togglePrintBorder"
      @adjustPrint="adjustPrint"
      @changeTextColor="changeTextColor"
      @remove="$emit('remove')"
    />
    <EditableArea
      ref="editableRef"
      :fontSize="fontSize"
      :isUnderline="isUnderline"
      :printBorder="printBorder"
      :textColor="textColor"
    />
  </div>
</template>
