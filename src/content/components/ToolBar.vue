<!--
  ツールバーコンポーネント
  テキストボックス上部に配置し、各操作をアイコンボタンで提供する
  各ボタンの@mousedown.stopにより、ボタンクリック時にドラッグが発動しないようにする
-->
<script setup lang="ts">
defineProps<{
  fontSize: number;
  isUnderline: boolean;
  /** 印刷時に枠線を表示するか */
  printBorder: boolean;
}>();

defineEmits<{
  fontSizeUp: [];
  fontSizeDown: [];
  toggleUnderline: [];
  togglePrintBorder: [];
  adjustPrint: [];
  remove: [];
}>();
</script>

<template>
  <div class="toolbar">
    <!-- 文字を拡大 -->
    <button title="文字を拡大 (Ctrl+Shift+B)" @click="$emit('fontSizeUp')" @mousedown.stop>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
        <line x1="17" y1="7" x2="23" y2="7" />
        <line x1="20" y1="4" x2="20" y2="10" />
      </svg>
    </button>
    <!-- フォントサイズ表示 -->
    <span class="font-size-display">{{ fontSize }}px</span>
    <!-- 文字を縮小 -->
    <button title="文字を縮小 (Ctrl+Shift+S)" @click="$emit('fontSizeDown')" @mousedown.stop>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
        <line x1="17" y1="7" x2="23" y2="7" />
      </svg>
    </button>
    <!-- 下線の切り替え -->
    <button
      title="下線の切り替え (Ctrl+Shift+U)"
      :class="{ active: isUnderline }"
      @click="$emit('toggleUnderline')"
      @mousedown.stop
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 3v7a6 6 0 0 0 12 0V3" />
        <line x1="4" y1="21" x2="20" y2="21" />
      </svg>
    </button>
    <!-- 印刷時の枠線表示 -->
    <button
      title="印刷時の枠線表示 (Ctrl+Shift+L)"
      :class="{ active: printBorder }"
      @click="$emit('togglePrintBorder')"
      @mousedown.stop
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    </button>
    <!-- 印刷用に画面サイズを調整 -->
    <button title="高さを調整 (Ctrl+Shift+A)" @click="$emit('adjustPrint')" @mousedown.stop>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="5" y="2" width="14" height="20" rx="1" />
        <line x1="9" y1="6" x2="15" y2="6" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    </button>
    <!-- テキストボックスを削除 -->
    <button title="テキストボックスを削除 (Ctrl+Shift+D)" @click="$emit('remove')" @mousedown.stop>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    </button>
  </div>
</template>
