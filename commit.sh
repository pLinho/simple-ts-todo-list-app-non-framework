#!/bin/bash
git add .

if [ $1 = "fix" ]
	then
		if [ $# -eq 2 ]
			then
			git commit -m "fixed $2"
	fi

	elif [ $# -eq 0 ]
	then
		git commit -m "code... require squash. 🎈"
	else
		git commit -m "$1"
fi
