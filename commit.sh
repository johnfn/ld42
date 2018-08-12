#!/bin/bash

git diff | tail -n 30 ; git status ;
read MESSAGE 
echo "$MESSAGE"
git add . && git commit  -m "$MESSAGE"  && git pull && git push
