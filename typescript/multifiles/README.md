- makeへの依存無くしたい

```
npm install -g dtsm
dtsm install
make
node ./lib/zip
# or
# FILE=src/zip make
```

## hmm

- requireを使ってnode_modulesを使う？
- 分けたファイルをimportを使ってimport?
- node.jsの機能を利用するコードを書いてみる

## node.jsの機能を使う方法

- Definetly Typedから `node.d.ts` を取得する

## Definetly Typedを使う方法

dtsmを使う？

```
npm install -g dtsm
dtsm search node
dtsm init
dtsm install --save node
```

## Project Template 的なものは何を使うと良いんだろう？

- [vvakame/typescript-project-sample](https://github.com/vvakame/typescript-project-sample)
- .etc
