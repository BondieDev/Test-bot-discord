const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// Load token from config.json
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function fetchGuildId() {
    // If the bot is in a guild, return its ID
    const guilds = client.guilds.cache;
    if (guilds.size > 0) {
        return guilds.first().id;
    } else {
        console.error('Bot is not in any guild!');
        process.exit(1);
    }
}

client.once('ready', async () => {
    console.log('Bot is ready!');

    // Fetch the application ID
    const clientId = "1234222053331177523";
    console.log('Application ID:', clientId);

    // Fetch the current guild ID
    const guildId = await fetchGuildId();
    console.log('Guild ID:', guildId);

    if (!clientId) {
        console.error('Failed to fetch application ID.');
        return;
    }

    // Register slash commands
    registerSlashCommands(clientId, guildId);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'kick') {
        // Implement kick command logic here
        await interaction.reply('Kick command executed.');
    } else if (commandName === 'ban') {
        // Implement ban command logic here
        await interaction.reply('Ban command executed.');
    } else if (commandName === 'random') {
        // Implement random command logic here
        await interaction.reply('Random command executed.');
    }
});

async function registerSlashCommands(clientId, guildId) {
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
            options: [], // No options for the random command
        },
    ];

    const rest = new REST({ version: '9' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Failed to refresh application commands:', error);
    }
}

client.login(token);
