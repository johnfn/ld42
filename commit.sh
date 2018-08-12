#!/bin/bash

read MESSAGE 
echo "$MESSAGE"
git add . && git commit  -m "$MESSAGE"  && git pull && git push
