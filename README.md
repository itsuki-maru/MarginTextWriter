# Margin Text Writer

## 概要

- **機能**:
    - Webページの余白にテキストを挿入する拡張機能。

- **用途**:
    - Webページの印刷時にメモやコメントを挿入するために使用。

## 使用方法

文字を挿入したいページ上で、キーボードの `M` と `T` キーを連続で押下するとテキストボックスが出現し、任意の文字列が入力可能となる。

### ショートカットキー

ショートカットキーはテキストボックスを選択（フォーカス）した状態で有効となる。

| 操作                   | キー             |
| ---------------------- | ---------------- |
| 文字を拡大             | Ctrl + Shift + B |
| 文字を縮小             | Ctrl + Shift + S |
| 下線の切り替え         | Ctrl + Shift + U |
| 高さを調整             | Ctrl + Shift + A |
| テキストボックスを削除 | Ctrl + Shift + D |
| 枠線表示               | Ctrl + Shift + L |

## 開発

### 前提条件

- Node.js (v18以上推奨)

### セットアップ

```bash
npm install
```

### ビルド

```bash
# 本番ビルド（dist/ に出力）
npm run build

# 開発用ウォッチモード（ファイル変更時に自動ビルド）
npm run dev
```

### デバッグ

1. `npm run dev` でウォッチモードを起動
2. Chrome で `chrome://extensions` を開く
3. 右上の「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`dist/` フォルダを選択
5. 任意のWebページを開き、`M` + `T` キーで動作確認
6. コードを変更すると自動でリビルドされるので、拡張機能の更新ボタン（🔄）をクリックしてページをリロード

#### DevTools での確認

- テキストボックスはShadow DOM内に描画される。DevToolsのElementsパネルで `#shadow-root (open)` を展開して確認できる
- Consoleパネルで `Margin Text Writer loaded.` / `Textbox initialized.` のログが出力されていれば正常

### 配布

#### Chrome Web Store への公開

1. `npm run build` で本番ビルドを実行
2. `dist/` フォルダをZIPに圧縮
   ```bash
   cd dist && zip -r ../margin-text-writer.zip . && cd ..
   ```
3. [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) にアクセス
4. 「新しいアイテム」からZIPファイルをアップロード
5. ストア掲載情報（説明文、スクリーンショット、カテゴリ等）を入力して審査に提出

#### 手動配布

1. `npm run build` を実行
2. `dist/` フォルダをZIPに圧縮して共有
3. 受け取った側は `chrome://extensions` でデベロッパーモードを有効にし、ZIPを解凍して「パッケージ化されていない拡張機能を読み込む」で `dist/` を指定