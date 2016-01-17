gulp sample

## setup

```
npm install
npm run build
```

細かく実行できるのが重要

```
# templateだけ変更した時
./node_modules/.bin/gulp html:patch

# mainのjsだけ変更した時
./node_modules/.bin/gulp browserify

# 外部パッケージ
./node_modules/.bin/gulp vendor
```

productionの時だけminifyする

```
NODE_ENV=production npm run build
# or 
NODE_ENV=dev MINIFY=1 npm run build
```

## todo

- gulp-userref and restore
- selective addition of css and images and fonts
- typescript
