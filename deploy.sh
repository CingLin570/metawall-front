#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e
# 打包
npm run build
# 移動至到打包後的dist目錄 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 git@github.com:<USERNAME>/<REPO>.git 分支為gh-pages
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

git push -f https://github.com/CingLin570/metawall-front.git master:gh-pages
cd -