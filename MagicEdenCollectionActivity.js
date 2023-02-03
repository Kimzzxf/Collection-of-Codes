//MagicEden Collection Activity
const request = require('request')
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],});


// When the client is ready, run this code (only once)
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const saveList = [];
    const collection = 'solana_monkey_business';    //collection ending of link ie: https://magiceden.io/marketplace/solana_monkey_business
    const url = `https://api-mainnet.magiceden.dev/v2/collections/${collection}/activities?offset=0&limit=10`;
    const solscanToken = 'https://solscan.io/token/';
    const solscanTXN = 'https://solscan.io/tx/';
    const solscanAddress = 'https://solscan.io/account/'
    const channel = client.channels.cache.find(channel => channel.name === 'test'); //Discord channel name

    setInterval(async () => {
        var exist = false;
        request.get(url,async function(error,response,body){
            const activity = JSON.parse(body)
            console.log(activity)
            for(i = activity.length -1; i >= 0; i--) {
                await sleep(750)
                const signature = activity[i]['signature']
                console.log(signature)
                const type = activity[i]['type'] //list or buyNow or bid
                const image = activity[i]['image']
                const price = activity[i]['price']
                const seller = activity[i]['seller']
                const buyer = activity[i]['buyer']  //null = listing
                const tokenMint = activity[i]['tokenMint']  //token mint address
                const timeSold = activity[i]['blockTime']
                if( type === 'buyNow') {
                    if(saveList.length != 0) {
                        for(n = 0; n < saveList.length; n++) {
                            if(saveList[n] === signature) { 
                                exist = true;
                            }
                        }
                    } else {
                        saveList.push(signature);
                    }

                    if(!exist) {
                        saveList.push(signature)
                        const embed = new EmbedBuilder()
                        const tokenUrl = 'https://api-mainnet.magiceden.dev/v2/tokens/' + tokenMint;
                        request.get(tokenUrl, async function(error,reponse,body) {
                            await sleep(500)
                            const tokenDescription = JSON.parse(body)
                            var name = tokenDescription['name']
                            const titleEmbed = name + ' → COLLECTED'
                            embed.setTitle(titleEmbed)
                        })
                        await sleep(1000)
                        const tokenLink = solscanToken+tokenMint;
                        const txnLink = solscanTXN+signature;
                        embed
                            .setColor(0xD3D3D3)
                            .setThumbnail(image)
                            .addFields(
                                { name: "Token", value: `[${tokenMint}](${tokenLink})`},
                                { name: "Sales Date", value: '<t:' + timeSold + ':f>', inline:true},
                                { name: "Price", value: price.toString() + ' SOL', inline:true},
                                { name: 'Transaction', value: `[${signature}](${txnLink})`},
                                { name: "Seller", value: '['+seller.slice(0,4) + '...' + seller.slice(seller.length - 4)+`](${solscanAddress}${seller})`, inline: true},
                                { name: "Buyer", value: '['+buyer.slice(0,4) + '...' + buyer.slice(buyer.length - 4)+`](${solscanAddress}${buyer})` , inline: true}
                            )
                        channel.send({embeds: [embed]});
                    }
                }
                if(saveList.length === 10) {
                    saveList.shift();
                }
            }
        })

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

    }, 15000);
});

client.on('messageCreate', m => {
	if(m.author.bot) return;
	console.log(m)
});

client.login(token);
