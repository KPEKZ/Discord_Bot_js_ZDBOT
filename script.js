const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();
const botconfig = require("./botconfig.json");
const token  = (botconfig.token);
let regStr = /\-([A-Za-z\s]{2,})/gi;
let userMessage ='';
let answer = '';
client.login(token);
//const broadcast = client.voice.createBroadcast();

client.on('ready', () => {
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
    generalChannel.send("Hello, channel!");
  });
  
client.on("message",(message)=>
{   
    
    
    // if (message.content === userMessage){
    //     console.log(answer);
    // }
    //console.log(answer);
    if(message.content === `${botconfig.prefix}privet`)
    {
        message.reply("Привет!:wave:");
    }
    if (message.content === "!ping")
    {
        message.channel.send('pong');
    }
    if (message.content === "кто пидор?"){
        message.channel.send('ты');
       // broadcast.play('https://music.yandex.ru/album/10130567/track/63591534');
    }

    userMessage = message.content.match(regStr);
    console.log('userMessage: ', userMessage);
    //  answer = message.content.match(userMessage);
    if(message.content === userMessage){
        console.log('userMessage: ', userMessage);
        const req = https.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200120T163823Z.7bb103fdefce1a07.97d3d9da4ad75918093ac27a6cb02de93e6848f8&lang=en-ru&format=plain&text=${userMessage}`,(res)=>{
            const statusCode = res.statusCode;
            let error;
            if (statusCode !== 200){
                error = new Error(`Request Failed.\n` +
                `Status Code: ${statusCode}`);
            }

            if (error) {
                console.log(error.message);
                // consume response data to free up memory
                res.resume();
                return;
              }

              let rawData = '';
                res.on('data', (chunk) => rawData += chunk);
                res.on('end', () => {
                    try {
                      let parsedData = JSON.parse(rawData);
                      console.log(parsedData.text[0]);
                      message.channel.send(parsedData.text[0]);
                    } catch (e) {
                      console.log(e.message);
                    }
                  });

                
                
        })
    }

    if(message.content === `${botconfig.prefix}help`)
    {
        message.channel.send('В разработке :)');
    }

    
});

