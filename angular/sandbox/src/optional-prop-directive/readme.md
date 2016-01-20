- app.js -- binding by &
- app2.js -- binding by & and ng-if
- app3.js -- binding by = and ng-if
- app4.js -- binding by & and ng-if and optional

app.js
```html
$ node app.js
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item item="u.item">
</item></dd></dl></user>
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item item="u.item">
</item></dd></dl></user>
```

app2.js
```html
$ node app2.js
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: </pre></item></dd><dd><!-- ngIf: u.item --></dd></dl></user>
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: </pre></item></dd><dd><!-- ngIf: u.item --></dd></dl></user>
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: this-is-message</pre></item></dd><dd><!-- ngIf: u.item --><item ng-if="u.item" info="u.item" class="ng-scope ng-isolate-scope"><pre class="ng-binding">info: this-is-message</pre></item><!-- end ngIf: u.item --></dd></dl></user>
```

app3.js

```html
$ node app3.js
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: </pre></item></dd><dd><!-- ngIf: u.item --></dd></dl></user>
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: </pre></item></dd><dd><!-- ngIf: u.item --></dd></dl></user>
----------------------------------------
<user class="ng-isolate-scope"><dl>
<dt class="ng-binding">foo</dt>
<dd><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: this-is-message</pre></item></dd><dd><!-- ngIf: u.item --><item ng-if="u.item" info="u.item" class="ng-scope ng-isolate-scope"><pre class="ng-binding">info: this-is-message</pre></item><!-- end ngIf: u.item --></dd></dl></user>
```

app4.js

```html
$ node app4.js
----------------------------------------
<user class="ng-isolate-scope"><name class="ng-binding">foo</name>
<x><item>
<y><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: </pre>
<!-- ngIf: i.info --><pre ng-if="i.info" class="ng-binding ng-scope">info2: </pre><!-- end ngIf: i.info --></item></y></item></x></user>
----------------------------------------
<user class="ng-isolate-scope"><name class="ng-binding">foo</name>
<x><item>
<y><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: </pre>
<!-- ngIf: i.info --><pre ng-if="i.info" class="ng-binding ng-scope">info2: </pre><!-- end ngIf: i.info --></item></y></item></x></user>
----------------------------------------
<user class="ng-isolate-scope"><name class="ng-binding">foo</name>
<x><item>
<y><item info="u.item" class="ng-isolate-scope"><pre class="ng-binding">info: this-is-message</pre>
<!-- ngIf: i.info --><pre ng-if="i.info" class="ng-binding ng-scope">info2: this-is-message</pre><!-- end ngIf: i.info --></item></y></item></x></user>
```
