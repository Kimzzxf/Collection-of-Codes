//Jup.ag live pinger
//Reviews all token in Jup.ag API
const request = require('request')
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],});
const trackToken = 'BWXrrYFhT7bMHmNBFoQFWdsSgA3yXoAnMhDK6Fn1eSEn' //Replace token you are looking for


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const url = 'https://cache.jup.ag/tokens';
    const channel = client.channels.cache.find(channel => channel.name === 'test'); //Replace with your discord channel name

    setInterval(async () => {

        request.get(url, async function(error,reponse,body){
            const activity = JSON.parse(body)
            console.log(activity)
            for(i = 0; i < activity.length; i++) {
                if(activity[i]['address'] === trackToken) {
                    channel.send('@everyone Live') 
                }
            }
        })
    
    }, 8000); 
});

client.on('messageCreate', m => {
	if(m.author.bot) return;
	console.log(m)
});

client.login(token);
