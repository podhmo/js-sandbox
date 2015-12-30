- makeへの依存無くしたい

```
npm install -g dtsm
dtsm install
make
node ./lib/zip
# or
# FILE=src/zip make
```

## sample

- fizzbuzz -- external moduleをimport,exportしたsample
- zip -- requireを使って外部ファイルを読み込んだsample
- helloserver -- node.d.tsを利用したsample
- echoargv -- 自分で定義したd.tsを利用したsample

## 考え事(WIP)

- requireを使ってnode_modulesを使う？
- 分けたファイルをimportを使ってimport?
- node.jsの機能を利用するコードを書いてみる
- referenceの利用は避けたい
- もう少し [importのこと](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#export-declarations) を把握したほうが良い

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

## tsconfig.jsonを使うように書き換えていきたい

- [schema](http://json.schemastore.org/tsconfig)

```
python gen.py tsconfig.json src/zip > src/zip/tsconfig.json
tsc -project src/zip
```
