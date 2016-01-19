- fetching-data-on-controller.js
- fetching-data-on-router-resolve.js

## fetching-data-on-controller

1. $location.change()
2. page change (new controller is created)
3. fething data

```
	action: getData: /B
1 /B ----------------------------------------
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
	action: dispatch: /B
 -- store data: {"name":"B","message":"this is B"}
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/B</p><pre class="ng-binding">this is B</pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/B</p><pre class="ng-binding">this is B</pre>
2 /A----------------------------------------
	action: pre $apply
			html: <p class="ng-binding">/B</p><pre class="ng-binding">this is B</pre>
	action: getData: /A
	action: post $apply
			html: <p class="ng-binding">/A</p><pre class="ng-binding"></pre>
	action: dispatch: /A
 -- store data: {"name":"A","message":"this is A"}
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/A</p><pre class="ng-binding">this is A</pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/A</p><pre class="ng-binding">this is A</pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/A</p><pre class="ng-binding">this is A</pre>
```

## fetching-data-on-router-resolve

1. $location.change()
2. fething data
3. page change (new controller is created)

```
	action: getData: /A
1 /B ----------------------------------------
			html: undefined
- - - - - - - - - - - - - - - - - - - - 
			html: undefined
	action: dispatch: /A
 -- store data: {"name":"A","message":"this is A"}
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
2 /A----------------------------------------
	action: pre $apply
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
	action: getData: /A
	action: post $apply
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/B</p><pre class="ng-binding"></pre>
	action: dispatch: /A
 -- store data: {"name":"A","message":"this is A"}
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/A</p><pre class="ng-binding"></pre>
- - - - - - - - - - - - - - - - - - - - 
			html: <p class="ng-binding">/A</p><pre class="ng-binding"></pre>
```
