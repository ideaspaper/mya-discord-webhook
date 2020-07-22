import { WebhookClient } from 'discord.js'
import { webhookID, webhookToken } from './../config.json'

export class DiscordClient {
  private static instance: DiscordClient;
  private client: WebhookClient;

  private constructor() {
    this.client = new WebhookClient(webhookID, webhookToken);
  }

  public static getInstance(): DiscordClient {
    if (!DiscordClient.instance) {
      DiscordClient.instance = new DiscordClient();
    }

    return DiscordClient.instance;
  }

  public sendMessage(message: string, format: string = ''): void {
    switch(format) {
      case 'quote':
        this.client.send(`> **${message}**`);
        break;
      case 'joke':
        this.client.send(`_${message}_`);
        break;
      case 'fact':
        this.client.send(`Did you know that: _${message}_`);
        break;
      default:
        this.client.send(message);
    }
  }
}
