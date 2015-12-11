#!/usr/bin/env bash

rsync -aP wanda-watcher/ pi@raspberrypi:/home/pi/wanda/wanda-watcher

# calibrate
ssh pi@raspberrypi "fswebcam -r 640x360 --no-banner /home/pi/wanda/wanda-watcher/public/calibrate.jpg"
