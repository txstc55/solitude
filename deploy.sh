#!/usr/bin/env sh

# abort on errors
set -e
git pull
npm install
# build
npm run build

rm -rf /var/www/html/vue/solitude/dist/
mv dist /var/www/html/vue/solitude/dist
sudo service nginx restart

