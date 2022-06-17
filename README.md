# metawall-front

## metawall 專案簡介
NFT 型態的社群網站，提供發文、追蹤、按讚等功能，主要由Vue 3框架開發前端，串接後端API的方式，
後端使用Node.js搭配mongoDB來儲存用戶相關資料

### Demo
https://cinglin570.github.io/metawall-front/#/

## 主要功能

* 註冊、登入(包括第三方登入)
* 個人資料修改、個人按讚貼文管理、個人追蹤用戶管理
* 張貼文章、貼文關鍵字搜尋
* 新增按讚用戶貼文、取消按讚用戶貼文、貼文留言
* 查看用戶個人資料、追蹤用戶、取消追蹤用戶

## 使用技術 / 套件

| 技術 | 簡述 |
| -------- | -------- |
| Vue Cli 3 | 以Vue.js開發 SPA 網站 |
| Vue Router | 路由設計管理 |
| Vue Components | 將重複使用的模組整理為元件 |
| ESLint(Standard) | 優化程式碼品質、維持統一風格 |
| Vuex | 全域資料狀態管理 |

| 套件 | 簡述 |
| -------- | -------- |
| Vue-axios | 串接後端API |
| Vee-validate | 表單驗證 |
| Bootstrap 5 | 開發 UI 介面 |
| vue3-loading-overlay | 讀取效果 |
| vuex-persistedstate | 資料狀態加密 |

## 如何本地執行專案
將下載專案Zip檔或使用git clone 至本地端

#### 安裝專案
`npm install`
#### 編譯及執行專案( Development 環境)
`npm run serve`
#### 編譯及壓縮至dist資料夾( Production 環境)
`npm run build`
#### 移動至到打包後的dist目錄 
`cd dist`

`git init`
`git add -A`
`git commit -m 'deploy'`
#### 部署到 github git 分支為gh-pages
`git push -f https://github.com/CingLin570/metawall-front.git master:gh-pages`