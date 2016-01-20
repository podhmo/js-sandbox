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
<x><item class="ng-isolate-scope"><description class="ng-binding">info: </description>
<!-- ngIf: i.info() --></item></x>
<y><item info="u.item" class="ng-isolate-scope"><description class="ng-binding">info: </description>
<!-- ngIf: i.info() --></item></y>
<z><!-- ngIf: u.item --></z></user>
----------------------------------------
<user class="ng-isolate-scope"><name class="ng-binding">foo</name>
<x><item class="ng-isolate-scope"><description class="ng-binding">info: </description>
<!-- ngIf: i.info() --></item></x>
<y><item info="u.item" class="ng-isolate-scope"><description class="ng-binding">info: </description>
<!-- ngIf: i.info() --></item></y>
<z><!-- ngIf: u.item --></z></user>
----------------------------------------
<user class="ng-isolate-scope"><name class="ng-binding">foo</name>
<x><item class="ng-isolate-scope"><description class="ng-binding">info: @default@</description>
<!-- ngIf: i.info() --><description ng-if="i.info()" class="ng-binding ng-scope">info2: @default@</description><!-- end ngIf: i.info() --></item></x>
<y><item info="u.item" class="ng-isolate-scope"><description class="ng-binding">info: this-is-message</description>
<!-- ngIf: i.info() --><description ng-if="i.info()" class="ng-binding ng-scope">info2: this-is-message</description><!-- end ngIf: i.info() --></item></y>
<z><!-- ngIf: u.item --><item ng-if="u.item" info="u.item" class="ng-scope ng-isolate-scope"><description class="ng-binding">info: this-is-message</description>
<!-- ngIf: i.info() --><description ng-if="i.info()" class="ng-binding ng-scope">info2: this-is-message</description><!-- end ngIf: i.info() --></item><!-- end ngIf: u.item --></z></user>
```
