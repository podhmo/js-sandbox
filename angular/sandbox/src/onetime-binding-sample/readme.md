app.js

```
<parent @><div>,<child user="parent.user" @><p %>()</p></child>,<p %>loading...</p>,</div></parent>
<parent @><div>,<child user="parent.user" @><p %>()</p></child>,<p %>loading...</p>,</div></parent>
<parent @><div>,<child user="parent.user" @><p %>foo(20)</p></child>,<p %>loaded</p>,</div></parent>
<parent @><div>,<child user="parent.user" @><p %>foo(20)</p></child>,<p %>loaded</p>,</div></parent>
<parent @><div>,<child user="parent.user" @><p %>foo(20)</p></child>,<p %>loaded</p>,</div></parent>
```

app2.js

```
<parent @><div>,<child name="parent.user.name" age="parent.user.age" @><p %>()</p></child>,<p %>loading...</p>,</div></parent>
<parent @><div>,<child name="parent.user.name" age="parent.user.age" @><p %>()</p></child>,<p %>loading...</p>,</div></parent>
<parent @><div>,<child name="parent.user.name" age="parent.user.age" @><p %>foo(20)</p></child>,<p %>loaded</p>,</div></parent>
<parent @><div>,<child name="parent.user.name" age="parent.user.age" @><p %>foo(20)</p></child>,<p %>loaded</p>,</div></parent>
<parent @><div>,<child name="parent.user.name" age="parent.user.age" @><p %>foo(20)</p></child>,<p %>loaded</p>,</div></parent>
```

```diff
--- app.js	2016-01-22 07:39:12.000000000 +0900
+++ app2.js	2016-01-22 07:43:49.000000000 +0900
@@ -25,7 +25,7 @@
       controllerAs: "parent",
       template: [
         '<div>',
-        '<child user="parent.user"></child>',
+        '<child name="parent.user.name" age="parent.user.age"></child>',
         '<p>{{parent.state}}</p>',
         '</div>'
       ]
@@ -40,12 +40,13 @@
       restrict: "E",
       scope: {},
       bindToController: {
-        user: "&"
+        name: "&",
+        age: "&",
       },
       controller: ChildController,
       controllerAs: "child",
       template: [
-        "<p>{{::child.user().name}}({{::child.user().age}})</p>"
+        "<p>{{::child.name()}}({{::child.age()}})</p>"
       ].join("\n")
     };
   }
```
