const Discord = require('discord.js');
const client = new Discord.Client();
client.login("NjY2MjgxNjE2MTIwNzQxOTE5.Xhx-eg.-d6kwVCUyOjXUn4BoLtaOU-YEJw");

client.on("message",(message)=>
{
    if(message.content === "!privet")
    {
        message.reply("Привет!:wave:");
    }
    if (message.content === "!ping")
    {
        message.channel.send('pong');
    }
});