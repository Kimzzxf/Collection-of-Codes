# Discord Bot Codes for Solana
A collection of discord bot codes for Solana marketplaces, DeFi, and more.

## Discord JupAg Pinger
A simple code to notify/ping you when a token is live to swap. (DeFi)

## MagicEden Collection Activity
All sales within the collection will be sent via Discord embed which monitors every 15 seconds or 15000 milliseconds.

# Installation
- [Visual Studio Code](https://code.visualstudio.com/) or any code editor
- [Node](https://nodejs.org/en/)
- Discord application
  - [Create a bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

### Packages
- DiscordJS
- Request
```sh
$ npm install discord.js
$ npm install request
```

# Files
Must have `config.json` which utilizes your Discord bot token (DO NOT SHARE)
```
{
  "token": "INSERT-TOKEN-HERE"
}
```
## Discord Jup.ag Pinger

`DiscordJupAgPinger.js` Replace 'test' with your desire channel name.

```
const channel = client.channels.cache.find(channel => channel.name === 'test'); //Replace with your discord channel name
```

## MagicEden Collection Activity

`MagicEdenCollectionActivity.js` Replace `const collection` to your desire collection

```
const collection = 'solana_monkey_business';    //collection ending of link ie: https://magiceden.io/marketplace/solana_monkey_business
```

Replace 'test' with your desire channel name.
```
const channel = client.channels.cache.find(channel => channel.name === 'test'); //Replace with your discord channel name
```
