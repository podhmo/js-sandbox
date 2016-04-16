import json
from wsgiref.simple_server import make_server

def app(environ, start_response):
    status = '200 OK'
    path = environ["PATH_INFO"]
    if path.startswith("/api"):
        return on_api(path, environ, start_response)
    else:
        return on_html(path, environ, start_response)
    headers = [('Content-type', 'application/JSON; charset=utf-8')]
    start_response(status, headers)
    return [json.dumps(data)]


def on_html(path, environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/html; charset=utf-8')]
    start_response(status, headers)
    with open("./index.html") as rf:
        return [rf.read()]


def on_api(path, environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'application/JSON; charset=utf-8')]
    start_response(status, headers)
    data = [
        {"author": "Pete Hunt", "text": "This is one comment"},
        {"author": "Jordan Walke", "text": "This is *another* comment"}
    ]
    return [json.dumps(data)]


httpd = make_server('', 8000, app)
print("Serving on port 8000...")

httpd.serve_forever()
