#!/usr/bin/bash

npm run build

folder="../../CampusMessageWall"

if [[ -d $folder ]]; then
  cd $folder;
  git pull;
  cp -r ../xiaojiaxinCS/Server/bin/* ./;
  cp -r ../xiaojiaxinCS/Server/package.json ./;
  git add .;
  git commit -m 'auto push';
  git push;
  echo 发布完成;
else
  echo '目录不存在';
fi