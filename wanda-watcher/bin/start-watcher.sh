#!/usr/bin/env bash

killall node

cd /home/pi/wanda/wanda-watcher && node /home/pi/wanda/wanda-watcher > stdout.txt 2> stderr.txt &
