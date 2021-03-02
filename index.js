const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require("./botconfig.json");
const token = process.env.BOT_TOKEN;
const Gif = /\!gif .*/i;

const commandsDescription = [`${prefix}gif (search a tenor GIF by name)`,
`${prefix}hello (say hello)`,
`${prefix}ping (Show your ping)`,
`${prefix}gav (i'm bark to the chat)`,
];
const url = 'https://www.anekdot.ru/random/anekdot/';


client.login(token);

client.on('ready', () => {
    console.log('Bot is ready!');
    client.user.setPresence({
        status: 'online',
        game: {
            name : `${prefix}help\n`,
            type: "PLAYING"
        }
    })
    console.log(`Logged in as ${client.user.tag}!`);
         // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
         // List all channels
        console.log(" - " + guild.name);
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })

    let generalChannel = client.channels.get("666283537481334789") // Replace with known channel ID
    generalChannel.send("Hello, channel!:wave:");
  });
  
client.on("message",(message)=>
{   
    
    if (message.content == `${prefix}spam`){
     
        setInterval(() => {
            message.channel.send('через каждые 5 секунд закрываш уши',{
                tts:true
            });
            
        }, 5000);
        
           
    
    }

    

    if(message.content === `${prefix}hello`)
    {
        message.reply("Привет!:wave:");
    }
  
    if (message.content === '!gav'){
        message.channel.send("гааааа аааа  аааа  ааа в", {
            tts: true
        });
    }

    //  answer = message.content.match(userMessage);
  
    if(message.content.match(Gif)){
        let SubStr = message.content.match(Gif);
        let search_term = SubStr[0].substring(5, SubStr[0].length);
        console.log('search_term: ', search_term);
        (async () => {
          let apikey = "X62CWH5HRXMV";
          let lmt = 8;
        
          let search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

          let response = await fetch(search_url);
          let clearRes = await response.json();
          let responseGif = clearRes.results[0]["media"][0]["tinygif"]["url"];

          message.channel.send(responseGif);
        })();
    }

    if(message.content === `${prefix}help`)
    {       message.channel.send('Я даю вам 30 секунд на просмотр!');
            commandsDescription.forEach(command => {
                message.channel.send(' - '+ command + '\n');
            })

      
    }

    if (message.content === `${prefix}ping`) {
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Pong",
                value: `You Ping is:  ${Date.now() - message.createdTimestamp} ms` //client.ping has been moved to the WebSocketManager under client.ws.ping
          }
         ],
    }
    })
       
    }

    
});
