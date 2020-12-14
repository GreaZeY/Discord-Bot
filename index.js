const Discord = require('discord.js');
const config = require("./config.json")
const bot = new Discord.Client();
const ucr = new Set();
const discordTTS=require("discord-tts");
const fs = require("fs");
bot.commands = new Discord.Collection();
const db = require('quick.db')
var jimp = require('jimp');
bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
const PREFIX = '~';
const prefix = '~';
var hc = 0;
bot.on('ready', () => {
    console.log('Bot is Alive 😁');
    bot.user.setPresence({
        status: "idle",  // You can show online, idle... Do not disturb is dnd
    });
   let statuses = [
       "~help",
       "Bloodline's Hotel",
       "DM me for HELP"
   ]
   setInterval(function(){
       let status = statuses[Math.floor(Math.random() * 3)]
     
       bot.user.setActivity(status,{type : "WATCHING"});
   },30000)

})


//////////////////////////////////////         MANAGE ROLE           /////////////////////////////////////////////////////////////////////////////////////////////////
bot.on("message", function (message) {
    if (message.content.toLowerCase().startsWith(PREFIX + "addrole" + " ")) {
        if (message.guild === null) return;
        let permission = message.member.hasPermission("MANAGE_ROLES");
        if (!permission) return message.channel.send("❌ You are missing the permission `Manage Roles`");
        let args = message.content.substring(PREFIX.length).split(" ");
        let rmember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);
        if (!rmember) return message.reply("Aisa koi banda nahi hai Server mai (case sensitive also)")
        let role = args.join(" ").slice(31)
        console.log("role -"+role)
        if (!role) return message.reply('Mention a role first!')
        let grole =message.guild.roles.cache.find(r => r.name === role);
        if (!grole) return message.reply("Can't find role "+role+"!")
        rmember.roles.add(grole.id)
        message.channel.send(`${rmember} you are now ${grole.name} in ${message.guild.name}`)




    }
    if(message.content.toLowerCase()==prefix+'about'){
        const embed = new Discord.MessageEmbed()
            .setFooter("About Bloodline BOT ",bot.user.avatarURL())
            .setThumbnail(bot.user.avatarURL())
            .addField('NAME' , '**Bloodline v2.0**',true)
            .addField('Version', '**2.0**',true)
            .addFields({ name: '\u200B', value: '\u200B' },)
            .addField('Creator/Developer','**GreaZeY#9750**',true)
            .addField('Latency/ping',`**🏓${Math.round(bot.ws.ping)} ms**`,true)

            .setColor("RANDOM")
        message.channel.send(embed);

    }
    if(message.content.toLowerCase()==prefix+'ping'){
        message.channel.send("`🏓"+`${Math.round(bot.ws.ping)}`+" ms`")
    }

    /////////////////////////////////             ANNOUNCE           ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(PREFIX + "announce" + " ")) {
        if (message.guild === null) return;
        let permission = message.member.hasPermission("ADMINISTRATOR");
        if (!permission) return 
        let args = message.content.substring(PREFIX.length).split(" ");
        let msg = message.content.slice(32)
        let chan_id = args[1].replace(/[\\<>@#&!]/g, "")
        if (isNaN(chan_id) && !chan_id) return message.channel.send("⚠️ You must specify a valid channel!")
        //if(!chan_id) return message.channel.send("⚠️Invalid channel!")
        if (!msg) return message.channel.send("⚠️ Message to de announce karne k liye !")
        let ch = bot.channels.cache.get(chan_id)
        //console.log("ARGS is "+chan)
        const embed = new Discord.MessageEmbed()
            .setAuthor('ANNOUNCEMENT📢')
            .setFooter('by '+message.author.tag)
            .setColor("RANDOM")
            .setDescription(`**${msg}**`)
        ch.send(embed);
    }


    /////////////////////////////////           USER INFO         //////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(PREFIX + "info" + " ") || message.content.toLowerCase().startsWith(PREFIX + "info")) {
        if (message.guild === null) return;
        //const Role = bot.roles.cache.find('name,'Server MODS')
        let target = message.mentions.users.first() || message.author;
        let target_id = target.id
        console.log(target + "  " + target_id)
        if (message.guild.members.cache.has(target_id)) {
            target = message.guild.member(target_id);
        } else {
            message.channel.send("Unable to find user.").catch(console.error);
        }
        if (!target) return;
        let member = target;
        const embed = new Discord.MessageEmbed()
            .setFooter("USER INFO")
            .addField('Player Name ', member.user.username)
            .setColor("RANDOM")
            .setThumbnail(member.user.avatarURL())
        message.channel.send(embed);
    }

    ///////////////////////////////////////          HELP               ////////////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(PREFIX + 'help') | message.content.toLowerCase() == '<@609713401777618965>'|message.content.toLowerCase() == '<@!609713401777618965>') {
        if (message.guild === null) return;
        const embed = new Discord.MessageEmbed()
            .setFooter("***Now say thanks to me 😊***")
            .setDescription("**Bloodline BOT commands List Prefix is `~`**")
            .addField('`~mmhelp` ', '**Modmail Feature**')
            .addField('`~help`', 'It will send you all commands of this Bot.')
            .addField('`~about`' , 'Information about BOT')
            .addField('`~ping`','To check the ping')
            .addField('`~calc`', 'Who dont do Maths.')
            .addField('`~av` or `~avatar` or `~av @mention`', 'Displays your Avatar.')
            .addField('`~join`', 'Bot will join voice channel.')
            .addField('`~leave`', 'Bot will leave voice channel.')
            .addField('`~say`', 'Text-to-speech Feature bot will say anything you want.')
            .addField('`~welchan`', 'Set your welcome channel. eg ~welchan #<channel_name>')
            .addField('`~msglogs`', 'Set your message log channel. eg ~msglogs #<channel_name>')
            .addField('`~wish @mention`', 'I wish you dont use that.')
            .addField('`~logs`', 'You will recieve a log file of server.')
            .addField('`~cls`', 'Deletes the chats.')
            .addField('`~addrole`', 'For giving a specified Role to mentioned user  eg ~addrole @mention role_name.')
            .addField('`~about`' , 'Information about BOT')
            .addField('`~announce`', 'Announce anything what you want. eg ~announce #channel_name msg_content')
            .addField('***Created by***', '**GreaZeY#9750**')
            .setColor("RANDOM")
        message.author.send(embed);
        message.channel.send("Check your inbox!")
        
    }



    if (message.content.toLowerCase().startsWith(PREFIX + 'mmhelp') ) {
        if (message.guild === null) return;
        const embed = new Discord.MessageEmbed()
            .setFooter("***Now say thanks to me 😊***")
            .setDescription("**About Modmail**")
            .addField('**Modmail** ', '**ModMail is a feature designed to enable your server members to contact staff easily. A new channel is created whenever a user messages the bot, and the channel will serve as a shared inbox for seamless communication between staff and the user.**')
            .addField('`mm.close`','to close the modmail ticket for a user.')
            .addField('***Created by***', '**GreaZeY#9750**')
            .setColor("RANDOM")
        message.author.send(embed);
        message.channel.send("Check your inbox!")
       
    }


})

fs.readdir("./msglog/", (err, files) => {          //msglog.js

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./msglog/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


/////////////////////////////////////           CREATION of SERVER LOG         //////////////////////////////////////////////////////////////////////////////////////////////////////
bot.on('message', msg => {
    if (msg.guild === null) return;
    let logchan = db.fetch(`msglog_${msg.guild.id}`)
    let welchan = db.fetch(`wchan_${msg.guild.id}`)
    fs.appendFileSync('LOG.txt', msg.guild.name + " ---> " + msg.createdAt + ' <--> ' + msg.author.tag + " : " + msg.content + "\n", (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })
    if (logchan === null) return;

    if (!logchan) return;
    if (msg.channel.id === welchan) return;
    if (msg.author.bot) return;
    console.log((msg.author.tag) + '(' + msg.author.id + ') :' + " " + msg.content)
    if (msg.guild === null) return;
    
    //let ch = bot.channels.get("616723378807504896")
    if (msg.guild === null) return;
    if (msg.attachments.size > 0) {
        var Attachment = (msg.attachments).array();
        msg.guild.channels.cache.get(logchan).send('👇' + 'Attachment sent at `' + msg.createdAt + '` in ' + '<#'+msg.channel+'>')
        try {
        const embed = new Discord.MessageEmbed()

            .addField('Attachment url ->', Attachment[0].url)
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .setColor("RANDOM")
        
            msg.guild.channels.cache.get(logchan).send(embed)
        } catch (e) {

        }

    } else if (msg.channel !== welchan) {
        msg.guild.channels.cache.get(logchan).send('👇' + 'Message sent at `' + msg.createdAt + '` in ' + '<#'+msg.channel+'>')
        if (msg.content.length > 1023) return msg.guild.channels.cache.get(logchan).send(msg.content);
        try {
        const embed = new Discord.MessageEmbed()
        
            .addField(`Message content :`, msg.content)
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .setColor("RANDOM")
        
            msg.guild.channels.cache.get(logchan).send(embed)
        } catch (e) {

        }
    }

    
})
bot.on("message",msg =>{


    
    
    if (!ucr.has(msg.author.id) && msg.content.toLowerCase() ==="hello")  {
        msg.react('👋');
        msg.reply('Hello');
        hc=1;
        
    }
    if (!ucr.has(msg.author.id) && msg.content.toLowerCase() === "hlo") {
        msg.react('👋');
        msg.reply('Hlo');
        hc=1
    
    }
    if (!ucr.has(msg.author.id) && msg.content.toLowerCase() === "hey") {
        msg.react('👋');
        msg.reply('Hey ');
        hc=1
        

    }
    if (!ucr.has(msg.author.id) &&  msg.content.toLowerCase() === "hi") {
        msg.react('👋');
        msg.reply('Hi whats up ');
        hc=1
        
    }
    if (!ucr.has(msg.author.id) && msg.content.toLowerCase() === "yo") {
        msg.react('👋');
        msg.reply('Yo ');
        hc=1
    
    }

////////////////////////////////////////////     T.O.      ////////////////////////////////////////////////////////////////////////////////////////////
           
                ucr.add(msg.author.id);
                setTimeout(()=> {
                    ucr.delete(msg.author.id);
                    hc = 0;
    
                }, 30000);
            
        
    
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////                WelcomeR                  /////////////////////////////////////////////////////////////////////////////////////

fs.readdir("./commands/", (err, files) => {         //setchannel.js

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

var tj = 0
bot.on("message", async message => {
    //a little bit of data parsing/general checks

    if (message.author.bot) return;
    if (message.guild === null) return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    //console.log(args)
    let prefix = config.prefix;
    //if(!message.content.startsWith(prefix+'welchan') | !message.content.startsWith(prefix+'msglogs')) return;

    //checks if message contains a command and runs it
    let commandfile = bot.commands.get(command.slice(prefix.length));
    //console.log("--------commandfile-"+commandfile.value)
    if (commandfile) commandfile.run(bot, message, args);


})
bot.on('guildMemberAdd', async function (member) {

    let wChan = db.fetch(`wchan_${member.guild.id}`)

    if (wChan === null) return;

    if (!wChan) return;


    let font64 = await jimp.loadFont('naruto.fnt')                             //We declare a 64px font
    let mask = await jimp.read('https://i.imgur.com/552kzaW.png')             //We load a mask for the avatar, so we can make it a circle instead of a shape
    let welcome = await jimp.read('https://media.istockphoto.com/photos/abstract-background-picture-id537447438?k=6&m=537447438&s=612x612&w=0&h=YF98lsh0OIxChOs4XmOFmuzLxSj8sieD-CiK-V8iGfU=') //We load the base image   http://rovettidesign.com/wp-content/uploads/2011/07/clouds2.jpg
    let rules = bot.channels.cache.get("461252943027372042");
    let ser = bot.guilds.first();
    var memcount = member.guild.memberCount;
    member.send(`🤗Welcome to ${ser} ${member}, ENJOY!!!🤗 and please read the rules in ` + rules + "and message me for any help");
    
    tj++
    console.log("user joined "+tj)
    //member.addRole(member.guild.roles.cache.find("name", "Greasers"))
    jimp.read(member.user.avatarURL()).then(avatar => {               //We take the user's avatar
        avatar.resize(280, 280)                                           //Resize it
        mask.resize(280, 280)                                            //Resize the mask
        avatar.mask(mask)                                               //Make the avatar circle
        welcome.resize(1000, 310)

        welcome.print(font64, 365, 55, `Welcome ${member.user.username}`)    //We print the new user's name with the 64px font
        welcome.print(font64, 600, 125, `to`)
        welcome.print(font64, 365, 195, `${ser}`)
        welcome.composite(avatar, 30, 13).write('Welcome2.png')            //Put the avatar on the image and create the Welcome2.png bot
        try {
            member.guild.channels.cache.get(wChan).send(`🤗Welcome to server ${member} you are **${memcount}**th member on this server, ENJOY!!!🤗 and please read the rules in ${rules}`, { files: ["Welcome2.png"] }) //Send the image to the channel
        } catch (e) {
        }
    })


})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////       SOME CASES       ////////////////////////////////////////////////////////////////////////////////





bot.on('message', message => {
    ///////////////////////////////////         AVATAR           //////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(prefix + 'av' + ' ') || message.content.toLowerCase().startsWith(prefix + 'avatar' + ' ') || message.content.toLowerCase().startsWith(prefix + 'av') || message.content.toLowerCase().startsWith(prefix + 'avatar')) {
        
        if (message.guild === null) return;
        let permission = message.member.hasPermission("MANAGE_CHANNELS");
        if(!permission) return;
        let target = message.mentions.users.first() || message.author;
        let target_id = target.id
        console.log(target + "  " + target_id)
        if (message.guild.members.cache.has(target_id)) {
            target = message.guild.member(target_id);
        } else {
            message.channel.send("Unable to find user.").catch(console.error);
        }

        if (!target) return;
        let member = target;
        let color = "#a8e8eb";
        if (member.colorRole) { color = member.colorRole.color; }
        let embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor(color)
            .setImage(member.user.displayAvatarURL({size: 4096}));
        message.channel.send(embed).catch(console.error);
        return;
    }




    //////////////////////                    CALCULATOR                      //////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(prefix + "calc")) {
        //var ca = message.content.substring(message.content.indexOf(" "));
        let ca = message.content.slice(6)
        var sign = ca.substring(ca.length - 1, ca.length)
        console.log("ca is" + ca + " sign is" + sign)
        if (sign == '%' | sign == '+' | sign == '-' | sign == '*' | sign == '/') return message.reply("What I do with these numbers.")
        if (!ca) return message.reply("Error!!!")
        try {
            message.reply(ca + " is " + eval(ca)).catch(console.error);
        } catch (e) {
        }

    }
    //////////////////////////////////////               WISH              ////////////////////////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(prefix + 'wish ')) {
        if (message.guild === null) return;
        const mem = message.mentions.members.first() || message.author;
        const member = message.guild.member(mem);
        if (member) {
            message.delete();
            console.log(message.author.id);
            message.channel.send("<@"+mem+">" + ' Hello');                  //blbot='<@610924138701258827>'  greasebot='<@609713401777618965>'


        }
    } 
    //////////////////////////////////////             SENDING LOG FILE            ///////////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase() == prefix + 'logs') {
        let permission = message.member.hasPermission("ADMINISTRATOR");

        if (!permission) return message.channel.send("❌ You are missing the permission `ADMINISTRATOR`")
        message.author.send(`LOG FILE`, { files: ["LOG.txt"] }) //Send the LOG.txt to the Author

        message.channel.send("Server Log file has sent!")

    }
    /////////////////////////////////////////      CLEAR         /////////////////////////////////////////////////////////////////////////////////
    if (message.content.toLowerCase().startsWith(PREFIX + 'cls')) {
        if (message.guild === null) return;
        let args = message.content.substring(PREFIX.length).split(" ");
        let permission = message.member.hasPermission("MANAGE_CHANNELS");
        if (!permission) {
            message.reply("You are missing the permission `MANAGE CHANNELS`"); setTimeout(function () {
                message.channel.bulkDelete(1);
            }, 3000);
        }
        if (!permission) return;
        if (!args[1]) {
            message.reply("Kitne chat karu delete wo to bataiye sarrr/mamm"); setTimeout(function () {
                message.channel.bulkDelete(1);
            }, 3000);
        }
        if (!args[1]) return;

        args[1]++;
        if (args[1] >= 100) return message.reply("Limit is 1 to 98");
        message.channel.bulkDelete(args[1]).then((message.reply('Done!')));
        setTimeout(function () {
            message.channel.bulkDelete(1);
        }, 3000);

    }
})
///////////////////////////////////          Moderation              //////////////////////////////////////////////////////////////////////////////////////
bot.on('message', message => {
    let bw = ['fuck', 'choot'];
    for (var i in bw) {
        if (message.content.toLowerCase().includes(bw[i]) && message.author.id !== '437348488846770208' && message.author.id !== '!437348488846770208') {
            
            if(message.member.hasPermission("MANAGE_MESSAGES") | message.member.hasPermission("ADMINISTRATOR")) return;
            
            message.delete();
            message.reply('Do not abuse here😡');
            setTimeout(function () {
                message.channel.bulkDelete(1);
            }, 6000);
        }

    }
})

////////////////////////////////////////             MOD-MAIL               //////////////////////////////////////////////////////////////////////////////////////

bot.on('message', async message => {
    if (message.author.bot) return;
    if(message.content.startsWith(prefix)) return;
    // Check if Message is in a DM
    if (message.guild === null) {
        // Fetch Activity Info
        let active = await db.fetch(`support_${message.author.id}`);
        let guild = bot.guilds.cache.get('411223992435998722'); // Your Server ID
        let channel, found = true;
        try {
            if (active) bot.channels.cache.get(active.channelID).guild;
        } catch (e) {
            found = false;
        }
        if (!active || !found) {
            // Create Support Channel.
            active = {};    
            let modRoles = guild.roles.cache.find(r => r.name === "🌀 Moderator"); // Find the Mod/Admin roles so only Admin/Mods will see the tickets. Add it in the quotes
            let everyone = guild.roles.cache.find(r => r.name === "@" + "everyone");
            let bot = guild.roles.cache.find(r => r.name === "🤖 BOTS");
            channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}-by modmail`,"text");
            //channel.setParent('787384073337045012'); 
            channel.setTopic(`~complete to close the Ticket | ModMail for ${message.author.tag} | ID: ${message.author.id}`);
            channel.updateOverwrite(modRoles, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                MANAGE_CHANNELS: true
            });
            channel.updateOverwrite(everyone, {
                VIEW_CHANNEL: false,
            });
            channel.updateOverwrite(bot, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                MANAGE_CHANNELS: true
            }); // This will set the permissions so only Staff will see the ticket.
            let author = message.author;
            const newChannel = new Discord.MessageEmbed()
                .setColor('36393E')
                .setAuthor(author.tag, author.avatarURL())
                .setFooter('ModMail Ticket Created')
                .addField('User', author)
                .addField('ID', author.id);
            await channel.send(newChannel);

            const newTicket = new Discord.MessageEmbed()
                .setColor('36393E')
                .setAuthor(`Hello, ${author.tag}`, author.avatarURL())
                .setFooter('ModMail Ticket Created');

            await author.send(newTicket);

            // Update Active Data
            active.channelID = channel.id;
            active.targetID = author.id;
        }

        channel = bot.channels.cache.get(active.channelID);
        const dm = new Discord.MessageEmbed()
            .setColor('36393E')
            .setAuthor(`Thank you, ${message.author.tag}`, message.author.avatarURL())
            .setFooter(`Your message has been sent -- A staff member will be in contact soon.`);

        await message.author.send(dm);

        const embed = new Discord.MessageEmbed()
            .setColor('36393E')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(message.content)
            .setFooter(`Message Recieved -- ${message.author.tag}`);

        await channel.send(embed);
        db.set(`support_${message.author.id}`, active);
        db.set(`supportChannel_${channel.id}`, message.author.id);
        return;
    }

    let support = await db.fetch(`supportChannel_${message.channel.id}`);
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = bot.users.cache.get(support.targetID);
        if (!supportUser) return message.channel.delete();

        // !complete command
        if (message.content.toLowerCase() === "mm.close") {
            const complete = new Discord.MessageEmbed()
                .setColor('36393E')
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL())
                .setFooter('Ticket Closed')
                .setDescription('*Your ModMail has been marked as **Complete**. If you wish to reopen this, or create a new one, please send a message to the bot.*');

            supportUser.send(complete);
            message.channel.delete()
                .then(console.log(`Support for ${supportUser.tag} has been closed.`))
                .catch(console.error);
            return db.delete(`support_${support.targetID}`);
        }
        const embed = new Discord.MessageEmbed()
            .setColor('36393E')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(`Message Recieved`)
            .setDescription(message.content);

        
        bot.users.cache.get(support.targetID).send(embed);
        message.delete({ timeout: 1000 });
        embed.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);
        return message.channel.send(embed);
    }


    // Variables
    let msg = message.content.toUpperCase(); // This takes the message.content, and turns it all uppercase.
    //let sender = message.author; // This variable holds the message's author.
    let args = message.content.slice(prefix.length).trim().split(' '); // This variable takes the message.content, slices off the prefix from the front, then trims the blank spaces on the side, and turns it into an array by separating it by spaces.
    if (!msg.startsWith(prefix)) return; // If the message doesn't start with the prefix, exit the code.

})

////////////////////////////             TTS            /////////////////////////////////////////////////////////////////////////////////////////////
bot.on("message", function (message) {
    if (message.author.bot || !message.guild) return;
    const content = message.content.toLowerCase();
    if (content === prefix + "join") {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            message.member.voice.channel.join()
                    message.reply('Here, I am!');
        } else {
            message.channel.send("Join a voice channel first!").catch(console.error);
        }
    } 
    if (content === prefix + "leave") {
        const connection = message.guild.voice.connection;
        
        if (connection) {
            connection.disconnect();
        }
    }
    if (content.startsWith(prefix + "say")) {
        const utterance = message.content.slice(5).trim();
        if (utterance) {
            if (!message.member.voice.channel) return message.channel.send("VC to join karlo pehle").catch(console.error);
            if (!message.guild.voiceConnection) {
                message.member.voice.channel.join()
                    .catch(console.log);
            }

            const broadcast = bot.voice.createBroadcast();
            var channelId=message.member.voice.channelID;
            var channel=bot.channels.cache.get(channelId);
            channel.join().then(connection => {
                broadcast.play(discordTTS.getVoiceStream(utterance));
                const dispatcher=connection.play(broadcast);
            });
        } else {
            message.channel.send("Kya bolu lol!").catch(console.error);
        }
    }

if(message.content.toLowerCase().startsWith(prefix+'spam ')&& message.author.id==greaseid){
    greaseid='437348488846770208'
    if(message.author.id!=greaseid) return message.reply("You are not GreaZeY!!!")
    var mem = message.mentions.members.first();
    let content = message.content.slice(6).split('<')
    if(!content) return message.reply("Give arguments to spam!!!")
    for(var i=0;i<=1000;i++){
        mem.send(content[0])
    }
}
});
/////////////////////////////         to off the bot            //////////////////////////////////////////////////////////////////////////////
bot.on("message",msg =>{
    
    if (msg.content.toLowerCase() === '~@~off~@~') {
        let permission = message.member.hasPermission("ADMINISTRATOR");
        if (!permission) return message.channel.send("❌ You are missing the permission `ADMINISTRATOR`")
        runstop.exe
        
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


bot.login('NjEwOTI0MTM4NzAxMjU4ODI3.XVMVcQ.XBYoOd3Yq_eJdqK5kndsnO17e54')
