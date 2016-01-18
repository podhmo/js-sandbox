# -*- coding:utf-8 -*-
import logging
import json
logger = logging.getLogger(__name__)

from wsgiref.util import setup_testing_defaults
from wsgiref.simple_server import make_server


def simple_app(environ, start_response):
    setup_testing_defaults(environ)

    status = '200 OK'
    headers = [('Content-type', 'text/json; charset=utf-8')]

    start_response(status, headers)
    data = {k: v for k, v in environ.items() if isinstance(v, (int, float, str, bool))}
    ret = bytes(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    return [ret]

httpd = make_server('', 8000, simple_app)
print("Serving on port 8000...")
httpd.serve_forever()
