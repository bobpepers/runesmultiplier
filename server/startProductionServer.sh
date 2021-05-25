#!/bin/bash -l

cd /home/app/LocalRunes/server
/usr/bin/screen -X -S api quit
/usr/bin/screen -dmS api
/usr/bin/screen -S api -p 0 -X stuff "bash $(printf \\r)"
sleep 10
/usr/bin/screen -S api -p 0 -X stuff "nvm use 13 $(printf \\r)"
sleep 10
/usr/bin/screen -S api -p 0 -X stuff "npm run dev $(printf \\r)"
sleep 10

