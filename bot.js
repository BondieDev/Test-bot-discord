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
