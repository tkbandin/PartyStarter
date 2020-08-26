#!/bin/sh

mongoUrl=`heroku config:get MONGODB_URI`
mongo $mongoUrl