#!/bin/bash

# --- nodejs server related script --- START --
crond
echo "@reboot root (echo _EASY_MYSQL && cd /var/_localApp/cloudApp && node server.js)" >> /etc/crontab
echo "* * * * * root (echo _EASY_MIN_CRON && echo '$(date +"%m/%d %H:%M:%S")'  >> /tmp/minCron.txt)" >> /etc/crontab
cd /var/_localApp/cloudApp

node server.js
