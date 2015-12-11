#!/usr/bin/env bash

rsync -aP /Users/jasonstorey/projects/wanda/ pi@raspberrypi:/home/pi/wanda --exclude '/Users/jasonstorey/projects/wanda/.idea'
