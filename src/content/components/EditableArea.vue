<!--
  テキスト編集エリアコンポーネント
  contentEditableなdivで、入力に応じて高さを自動調整する
  枠線は画面上で常に表示し、印刷時はprintBorderに応じて切り替える
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{
  fontSize: number;
  isUnderline: boolean;
  /** 印刷時に枠線を表示するか */
  printBorder: boolean;
}>();

const editableRef = ref<HTMLElement | null>(null);

/** テキスト入力に応じて高さを自動調整 */
function adjustHeight(): void {
  const el = editableRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

/** 編集エリアにフォーカスを設定 */
function focus(): void {
  editableRef.value?.focus();
}

onMounted(() => {
  adjustHeight();
  focus();
});

// 親コンポーネントからfocus()を呼び出せるようにする
defineExpose({ focus });
</script>

<template>
  <div
    ref="editableRef"
    class="editable-area"
    :class="{ 'print-border': printBorder }"
    contenteditable="true"
    data-placeholder="ここにテキストを入力..."
    :style="{
      fontSize: fontSize + 'px',
      textDecoration: isUnderline ? 'underline' : 'none',
      textUnderlineOffset: '5px',
    }"
    @input="adjustHeight"
  ></div>
</template>
