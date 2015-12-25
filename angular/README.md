memo
----------------------------------------

- typescript
- angular

angular用のsandboxを作りたい。

要望

- bowerには依存したくない。
- なるべく.d.ts管理したくない(package.jsonのtypings見に行って欲しい)

現実と向き合う
----------------------------------------

dtsm

```
./node_modules/.bin/dtsm init
./node_modules/.bin/dtsm search angular
./node_modules/.bin/dtsm install --save angular
# using link?
```
