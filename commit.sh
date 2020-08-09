	#!/bin/bash
git add .


if [ $1 -eq "fix" ]
	then
		echo "teste fix"

	elif [ $# -eq 0 ]
	then
		git commit -m "code... require squash. 🎈"
	else
		git commit -m "$1"
fi
