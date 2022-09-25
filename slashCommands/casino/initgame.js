//send embed with button to join roulette
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ApplicationCommandType } = require("discord.js");
const fs = require('fs');
module.exports = {
    name: 'initgame',
    description: 'Starts a roulette game',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'game',
            description: 'The game to start',
            type: 3,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, choices) => {
        //get the games without the .js extension
        const games = fs.readdirSync('./slashCommands/casino/initgame').map(file => file.replace('.js', ''));
        //map the games to the choices
        choices = games.map(game => ({name: game, value: game}));

    
        interaction.respond(choices).catch(console.error);
    },
    run: async (client, interaction) => {
        if(interaction.isAutocomplete()) return console.log("Autocomplete");

        //only allow bot admins to use this command with client.isAdmin(interaction.user.id)
        if(!client.isAdmin(interaction.user)) return interaction.reply({ content: 'You don\'t have permission to use this command!', ephemeral: true });


        const game = interaction.options.getString('game');

        
        
            //check if the file exists in /initgame with fs
            if(fs.existsSync(`./slashCommands/casino/initgame/${game}.js`)) {
                //if it does, require it
                const gameFile = require(`./initgame/${game}.js`);
                //run the run function
                gameFile.run(client, interaction);
                //reply with a message
                interaction.reply({content: `Starting ${game}...`, ephemeral: true});

            } else {
                //return ephemeral message if the file doesn't exist (game does not exist)
                interaction.reply({ content: 'That game does not exist!', ephemeral: true });
            }

        
    }
}