#!/bin/bash

git diff | tail -n 30 ; git status ;
read MESSAGE 
echo "$MESSAGE"
while true ; do
    git add . && git commit  -m "$MESSAGE"  && git pull -q && git push
done
