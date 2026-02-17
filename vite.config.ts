import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * Viteビルド設定
 * Chrome拡張のcontent scriptはESモジュール不可のため、IIFE形式で単一ファイルにバンドルする
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // CSSを別ファイルに分割しない（Shadow DOM内にJS経由で注入するため）
    cssCodeSplit: false,
    // SVGなどの小さなアセットをdata URIとしてインライン化
    assetsInlineLimit: 100000,
    rollupOptions: {
      input: "src/content/main.ts",
      output: {
        // content scriptはESモジュール不可のためIIFE形式
        format: "iife",
        entryFileNames: "content.js",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
