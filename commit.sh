#!/bin/bash
git add .

if [ $# -eq 0 ]
	then
git commit -m "code... require squash. 🎈"
	else
git commit -m {$1-text}
fi
