## setup

```
npm install -D typescript browserify
npm install -S angular2 reflect-metadata zone.js
```

## memo

- typescriptの各optionは調べておいたほうが良い
- そう言えばtypescriptのsandboxが無い。

## errors:

browserifyを実行したタイミングで以下が発生

```
Error: Cannot find module 'rxjs/operators/toPromise' from './hello/node_modules/angular2/src/facade'
```

rxjsのtoPromiseなどは `operators` から `operator` に移動になったのかも。

```
cd node_modules/angular2
grep -rl "rxjs/operators" . | xargs gsed -i 's/rxjs\/operators/rxjs\/operator/g;'
```

## 参考

- http://qiita.com/armorik83/items/519cbc94459a87a4fbba
