<!--
  ルートコンポーネント
  main.tsから受け取ったdestroyCallbackを子コンポーネントのイベントに接続する
-->
<script setup lang="ts">
import TextBoxContainer from "./components/TextBoxContainer.vue";

const props = defineProps<{
  /** テキストボックス破棄時に呼び出されるコールバック */
  destroyCallback: () => void;
}>();

/** テキストボックス削除時 */
function onRemove(): void {
  props.destroyCallback();
}

/** 印刷調整による再初期化時 */
function onReinit(): void {
  props.destroyCallback();
}
</script>

<template>
  <TextBoxContainer @remove="onRemove" @requestReinit="onReinit" />
</template>
