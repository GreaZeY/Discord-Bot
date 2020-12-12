const Discord = require('discord.js')
var jimp = require('jimp');
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {

	let permission = message.member.hasPermission("ADMINISTRATOR");

if(!permission) return message.channel.send("❌ You are missing the permission `ADMINISTRATOR`")
		

console.log("args is "+args[0])
if(args[0]==null) return message.channel.send('⚠️ You must specify a valid id or channel for the welcome channel!')
        let cArgs = args[0].replace(/[\\<>@#&!]/g, "")

 //let cArgs = args[0]
 console.log("cArgs is "+cArgs )
 if(isNaN(cArgs)) return message.channel.send("⚠️ You must specify a valid id or channel for the welcome channel!")
	 
 try{
	 //bot.guilds.get(message.guild.id).channels.get(cArgs).send("✔️ Welcome channel set!")
	 
 db.set(`wchan_${message.guild.id}`, cArgs)
 console.log('whan'+message.guild.id);
 message.channel.send("✔️ You have successfully set the welcome channel to " + args[0])
return;
 }catch(e){
	return message.channel.send("❌Error: missing permissions or channel doesn't exist❌")
 }
 
 
}
module.exports.help = {
  name: "welchan"
}

