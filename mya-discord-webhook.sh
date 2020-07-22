#!/bin/sh
if pidof -o %PPID -x "mya-discord-webhook.sh">/dev/null;
then
  echo "Process already running"
	exit 1
else
  (cd "${0%/*}"; npm run start)
fi