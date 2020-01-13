const Discord = require('discord.js');
const client = new Discord.Client();
client.login("NjY2MjgxNjE2MTIwNzQxOTE5.Xhx7bQ.JBVsDMX953ADYLAuKFWRRO6in3I");

client.on("message",(message)=>
{
    if(message.content === "!privet")
    {
        message.reply("Привет!:wave:");
    }
});