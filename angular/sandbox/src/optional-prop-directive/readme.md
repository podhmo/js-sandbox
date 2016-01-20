- app.js -- binding by &
- app2.js -- binding by & and ng-if
- app3.js -- binding by = and ng-if

```html
node app.js
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

```html
node app2.js
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
