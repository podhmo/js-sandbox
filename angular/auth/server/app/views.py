# -*- coding:utf-8 -*-
from pyramid.response import Response
from pyramid.view import view_config

@view_config(route_name="home")
def hello(request):
    return Response("hello")
