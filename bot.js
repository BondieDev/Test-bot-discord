<<<<<<< HEAD
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('./config.json');

client.once('guildCreate', guild => {
    config.guildId = guild.id;
    console.log('Guild ID:', config.guildId);

    // Once the guild ID is fetched, refresh the application commands
    refreshApplicationCommands();
});

async function refreshApplicationCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

client.on('message', message => {
    console.log(`[${message.guild.name} > ${message.channel.name}] ${message.author.username}: ${message.content}`);
});

const commands = [
    {
        name: 'kick',
        description: 'Kick a user from the server',
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'The user to kick',
                required: true,
            },
            {
                name: 'reason',
                type: 'STRING',
                description: 'Reason for the kick',
                required: false,
            },
        ],
    },
    {
        name: 'ban',
        description: 'Ban a user from the server',
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'The user to ban',
                required: true,
            },
            {
                name: 'reason',
                type: 'STRING',
                description: 'Reason for the ban',
                required: false,
            },
        ],
    },
    {
        name: 'random',
        description: 'Generate a random number',
    },
];

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'kick') {
        // Code for /kick command
    } else if (commandName === 'ban') {
        // Code for /ban command
    } else if (commandName === 'random') {
        // Code for /random command
    }
});

client.login(config.token);
=======

const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");
const fs = require("fs");

client.on("ready", () => {

	let serverlist = ''
	let count = 0; //<---
	client.guilds.cache.forEach((guild) => {
    count += guild.memberCount // <---

})
  
  console.log(`Bot has started, with ${client.guilds.cache.size} servers, ${client.channels.cache.size} channels and ${count} users.`); 
  
  let statuses = [ `over ${count} users!`];

    let status = statuses[Math.floor(Math.random()*statuses.length)];
    
    client.user.setStatus('idle')
    client.user.setPresence({ activities: [{ name: status }], status: 'idle' });
    client.user.setActivity(status, { type: 'WATCHING' });

  })

client.on("guildCreate", guild => {
  
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("message", async message => {
  if(message.author.bot) return;  
  console.log("[" + message.channel.name + "] " + message.member.user.tag + " > " + message.content);
  if(message.content.indexOf(config.prefix) !== 0) return;

  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
 	message.channel.send("Pinging...").then(m =>{
          
            var ping = m.createdTimestamp - message.createdTimestamp;

          
            var embed = new Discord.MessageEmbed()
            .setAuthor(`Bot's latency is ${ping}ms`)
            .setColor("#6a0dad")
            
            
            m.edit(embed)
        });
  	  }

  if (command === "say"){
  	message.delete();
  	let MSG = message.content.split(" ");
  	let Query = MSG.slice(1).join("+");
  	let QueryD = MSG.slice(1).join(" ");
  	if (!Query) message.reply("Please specify something for me to say!")
  	else
  {
    message.channel.send(QueryD)
}
}

  // if(command === "slap") {
  //   let userK = message.mentions.members.first();
  //   let userS = message.member.id;
  //   let number = Math.floor((Math.random() * 14) + 1);

  //   if (!userK) {
  //       message.channel.send("You can't slap nobody!")
  //       return;
  //  }

  //   message.delete();
  //   message.channel.send("<@"+userS+">  slapped " + "<@"+userK+">", {
  //       files: [
  //           "./pics/slap/slap"+number+".gif"
  //       ]});
  // }

  if(command === "uptime") {
  	let totalSeconds = (client.uptime / 1000);
	let days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	let uptime = `${days}d, ${hours}h, ${minutes}m and ${seconds}s`;
    message.channel.send("Current bot uptime: "+uptime);
  }

  if(command === "addchannel") {
  	if (message.author.id == "316108756243054605") {
          var argresult = args.join(' ');
              message.guild.channels.create(argresult, "text");
              message.channel.send("Added channel!")
      } else {
          message.reply("You are not the bot owner!");
      }
  }

  if(command === "setstatus") {
  	if (message.author.id == "316108756243054605") {
          var argresult = args.join(' ');
              client.user.setStatus('idle')
    		  client.user.setActivity(argresult, { type: 'WATCHING' });
    		  message.reply("Status has been changed!")
      } else {
          message.reply("You are not the bot owner!");
      }
  }
   if (command === "setusername") {
      if (message.author.id == "316108756243054605") {
          var argresult = args.join(' ');
              client.user.setUsername(`${argresult}`);
              message.channel.send("Bot's username has been changed!");
      } else {
          message.reply("You are not the bot owner!");
      }
  }

   if (command === "setavatar") {
      if (message.author.id == "316108756243054605") {
          var argresult = args.join(' ');
              client.user.setAvatar(`${argresult}`);
              message.channel.send("Bot's avatar has been changed!");
      } else {
          message.reply("You are not the bot owner!");
      }
  }

  // MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION MODERATION 

  //kick

  if (command === "kick") {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      if(!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply("Sorry, you don't have permissions to use this!");
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('haha get kicked scrub').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }

  //purge

  if(command === "purge") {

        if(message.member.hasPermission("MANAGE_MESSAGES"))  {
    
        const deleteCount = parseInt(args[0], 10);

            if(!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.reply("Please, type a number between 1 and 100.");
    
                const fetched = await message.channel.messages.fetch({limit: deleteCount});
                    message.channel.bulkDelete(fetched)
                        .catch(error => message.reply(`Couldn't remove the messages because: ${error}`));
                        message.channel.send(`:white_check_mark: Messages deleted`)
            .then(m => m.delete({ timeout: 5000 }));
        }
            else {
                message.channel.send("You don't have the permission to purge messages!");
            }
    }

    //ticket

    if (command === "ticket") {
    const cooldown = new Set();
    let args = message.content.split(' ').slice(1).join(' ');
    message.delete();
    if (cooldown.has(message.author.id && message.guild.id)) {
        return message.channel.send('**[COOLDOWN]** Sending tickets has **5 Minutes** Cooldown!');
    }
    if (args.length < 1) {
        return message.channel.send(`You must give me something to ticket first ${message.author} try using -ticket [message]`);
    }
    cooldown.add(message.author.id && message.guild.id);
    setTimeout(() => {
        cooldown.delete(message.author.id && message.guild.id);
    }, 300000);
    let guild = message.guild;
    message.channel.send(`Hey, ${message.author}, we got your ticket! We will reply soon as possible! Here is the full ticket:`)
    .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
    const embed2 = new Discord.MessageEmbed()
        .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL)
        .addField('Ticket:', `**Ticket's Author:** ${message.author.tag}\n**Server:** ${guild.name}\n**Full ticket:** ${args}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor(16711728);
    message.channel.send({ embed: embed2 })
    .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
    const embed = new Discord.MessageEmbed()
        .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL)
        .addField('Ticket:', `**Ticket's Author:** ${message.author.tag}\n**Server:** ${guild.name}\n**Full ticket:** ${args}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor("#ffd700");
    client.users.cache.get("316108756243054605").send({ embed });
  }

if(command === "help") {
  let help = new Discord.MessageEmbed()
  .setColor("#00ff00")
  .setTitle("**Command Explanation**")
  .addField("-Ticket [message]", "Creates a ticket that will be sent to the bot owner, used for suggestions.")
  .addField("-Ping", "Shows the bot's latency.")
  .addField("-Say [message]", "Makes the bot say the pre-defined message.")
  .addField("-Uptime", "Shows the bot's uptime.")
  message.channel.send(help);
}

});

//everything below this is wITHOUT PREFIX

  client.on("message", (message) => {
  if(message.author.bot) return; 
  const command = message.content.toLowerCase();

    // message.react("<:pepecrozz:935547160466952243>");
  	// message.channel.send("Hello I am Bondie's Bot. You can summon me by literally typing anything.")

});

;

client.login(config.token);
>>>>>>> a70e371eb80867f52306eaa4598af20131322e9b
