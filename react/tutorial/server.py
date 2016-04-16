import json
import cgi
import random
from wsgiref.simple_server import make_server


def app(environ, start_response):
    path = environ["PATH_INFO"]
    if path.startswith("/api"):
        return on_api(path, environ, start_response)
    else:
        return on_html(path, environ, start_response)


def on_html(path, environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/html; charset=utf-8')]
    start_response(status, headers)
    with open("./index.html") as rf:
        return [rf.read()]


data = [
    {"author": "random", "text": "{}".format(random.random())},
    {"author": "Pete Hunt", "text": "This is one comment"},
    {"author": "Jordan Walke", "text": "This is *another* comment"}
]


def on_api(path, environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'application/JSON; charset=utf-8')]
    start_response(status, headers)

    if environ["REQUEST_METHOD"] == "POST":
        wsgi_input = environ["wsgi.input"]
        form = cgi.FieldStorage(fp=wsgi_input, environ=environ, keep_blank_values=True)
        data.append({k: form[k].value for k in form if k in ("author", "text")})
    else:
        data[0]["text"] = "{}".format(random.random())
    return [json.dumps(data)]


httpd = make_server('', 8000, app)
print("Serving on port 8000...")

httpd.serve_forever()
