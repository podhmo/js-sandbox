# :ghost:

angular is ommting Content-Type header if request data is undefined.


server
```
pyhthon server.py
```

sample

```
# http is httpie
$ http http://localhost:8000 "Content-Type:application/json" | grep CONTENT
  "CONTENT_LENGTH": "",
  "CONTENT_TYPE": "application/json",
$ http http://localhost:8000 "Content-Type:text/html" | grep CONTENT
  "CONTENT_LENGTH": "",
  "CONTENT_TYPE": "text/html",
$ http http://localhost:8000 | grep CONTENT
  "CONTENT_LENGTH": "",
  "CONTENT_TYPE": "text/plain",
```

from angular
```
node app.js
input: {}
Content type: text/plain
input: {"headers":{"Content-Type":"application/json"}}
Content type: text/plain
input: {"headers":{"Content-Type":"application/json"}, "data":""}
Content type: application/json
```
