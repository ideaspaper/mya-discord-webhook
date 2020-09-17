# Mya Discord Webhook

## Description

This is Discord bot (webhook) for Hacktiv8 Remote Campus (Phase 0). One the aims of remote campus is to give students the experience of offline campus, therefore engaging environment is a must. Remote campus' instructors have to be active in chat, just like offline campus' instructors should be present in the campus all the time. After some observations, remote campus' instructors have to send some repetitive messages everyday such as:

- Quote + morning greeting.
- Lunch greeting.
- Standup message.
- Joke/useless fact message.
- Night greeting.

By using this bot, remote campus' instructors do not need to send those messages manually.

## Installation

This bot deppends on some external packages. Use `npm install` to install all needed packages.

## Usage

### `config.json`

Configuration for this bot will be taken from `config.json`. You should create the file then put it in `src` directory. The template for `config.json` is as below.

```json
{
  "webhookID": "",
  "webhookToken": "",
  "webhookName": "MYA",
  "dbName": "webhook.db"
}
```

- `webhookID`: get it from Discord server.
- `webhookToken`: get it from Discord server.
- `webhookName`: name of the bot.
- `dbName`: sqlite database for messages. The database should be placed inside `dist` directory.

### `jobs.json`

The schedule for sending each message can be configured in `jobs.json`. Create the file then put it in `src` directory. Each message will be associated with one job. Example of `jobs.json` content is as below.

```json
{
  "standard": [
    {
      "event": "quote",
      "cronTime": "0 30 8"
    },
    {
      "event": "morning",
      "cronTime": "5 30 8"
    },
    {
      "event": "lunch",
      "cronTime": "0 0 12"
    },
    {
      "event": "fact",
      "cronTime": "0 42 14"
    },
    {
      "event": "standup",
      "cronTime": "0 0 17"
    },
    {
      "event": "night",
      "cronTime": "0 0 18"
    },
    {
      "event": "joke",
      "cronTime": "0 0 19"
    }
  ]
}
```

- `standard`: the name refer to standard job, where each job inside it will be executed every work day (Monday - Friday).
- `standard.event`: as for now, supported events are `"quote"`, `"morning"`, `"lunch"`, `"fact"`, `"joke"`, `"standup"` and `"night"`.
- `standard.cronTime`: cron schedule expression. Supported cron values are `Seconds`, `Minutes` and `Hours`.

After configuring both files, execute `./mya-discord-webhook` to run the bot.
