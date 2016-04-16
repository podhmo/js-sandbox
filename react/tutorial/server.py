import os.path
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
    headers = [('Content-type', 'text/html; charset=utf-8')]
    if path in ("", "/"):
        path = "index.html"
    try:
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), path.lstrip("/"))) as rf:
            status = '200 OK'
            start_response(status, headers)
            return [rf.read()]
    except Exception as e:
        print(e)
        status = '404 Not Found'
        start_response(status, headers)
        return [bytes(path)]


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
        content_length = int(environ["CONTENT_LENGTH"])
        data.append(json.loads(wsgi_input.read(content_length)))
    else:
        data[0]["text"] = "{}".format(random.random())
    return [json.dumps(data)]


httpd = make_server('', 8000, app)
print("Serving on port 8000...")

httpd.serve_forever()
