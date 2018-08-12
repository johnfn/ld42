#!/bin/bash

git checkout master && git pull -q && git checkout - && git merge master
