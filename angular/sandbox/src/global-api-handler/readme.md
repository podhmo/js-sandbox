```
$ node app.js
call 404;
failure: {"data":{"message":"not found"},"status":404,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"/news/404","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""}
! catch {"data":{"message":"not found"},"status":404,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"/news/404","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""}
----------------------------------------
call 404;
failure: {"data":{"message":"not found"},"status":404,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"/news/404","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":""}
intercept!
```
