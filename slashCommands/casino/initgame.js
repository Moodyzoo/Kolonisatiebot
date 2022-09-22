//send embed with button to join roulette
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    name: 'initgame',
    description: 'Starts a roulette game',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'game',
            description: 'The game to start',
            type: 4,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, choices) => {
        const data = ['roulette', 'blackjack'];
        
        data.forEach(game => {
            choices.push({
                name: `${game}`,
                value: `${game}`
            });
        });
        interaction.respond(choices).catch(console.error);
    },
    run: async (client, interaction) => {
        if(interaction.isAutocomplete()) return console.log("Autocomplete");
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('roulette_button')
                    .setLabel('Join')
                    .setStyle(3)
            );

        //create embed
        const embed = new EmbedBuilder()
            .setTitle('Roulette')
            .setDescription('Click the button to join the roulette game')
            .setColor('#00ff00')
            
            

        interaction.channel.send({ content: 'Roulette test!', components: [row] });
    }
}