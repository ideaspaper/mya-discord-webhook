# Mya Discord Webhook

## Description

This is Discord bot (webhook) for Hacktiv8 Remote Campus (Phase 0). One the aims of remote campus is to give students the experience of offline campus, therefore engaging environment is a must. Remote campus' instructors have to be active in chat, just like offline campus' instructors should be present all the time. After some observation, some chat messages are repetitive. Those messages are:

- Morning greeting
- Lunch greeting
- Standup message
- Joke/useless fact message
- Night greeting

By using this bot, those messages will be automated.

## Installation

This bot deppends on some external packages. Use `npm install` to install all needed packages.

# Usage

Configuration for this bot will be taken from `config.json`. You should create the file and put it in `src` directory. The template for `config.json` file is as below.

```json
{
  "webhookID": "",
  "webhookToken": "",
  "webhookName": "",
  "dbName": ""
}
```

- `webhookID`: get it from Discord server.
- `webhookToken`: get it from Discord server.
- `webhookName`: name of the bot.
- `dbName`: sqlite database for messages.

After making the `config.json` file, execute `npm run start` to run the bot.
