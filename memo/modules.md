[Loading from `node_modules` Folders](http://nodejs.jp/nodejs.org_ja/docs/v0.4/api/modules.html)

もし require() に渡されたモジュール識別子がネイティブモジュールではなく、かつ '/' や '../' や './' から始まらないならば、 Node は現在のモジュールの親ディレクトリに '/node_modules' を付与してそこからモジュールを読み込もうとします。

そこに見つからない場合はさらに親ディレクトリに移動し、モジュールが見つかるか root ディレクトリに到達するまで同様のことを繰り返していきます。

例えば '/home/ry/projects/foo.js' の中で require('bar.js') を呼んでいた場合、 Node は下記の位置を上から順番に見ていきます。

1. /home/ry/projects/node_modules/bar.js
2. /home/ry/node_modules/bar.js
3. /home/node_modules/bar.js
4. /node_modules/bar.js

この仕組みによって、プログラムはクラッシュを避けるために依存関係を上書きすることができるのです。
