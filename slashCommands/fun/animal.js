const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'animal',
	description: "A test command for showing autocomplete slash command.",
	type: ApplicationCommandType.ChatInput,
	options: [
        {
            name: 'animal',
            description: 'Choose an animal.',
            type: 3,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, choices) => {
        const data = {
            'a': ['dog', 'cat', 'rabbit'],
            '967751631695405097': ['lizard', 'horse', 'hamster']
        }
        data["a"].forEach(animal => {
            choices.push({
                name: `${animal}`,
                value: `${animal}`
            });
        });
        interaction.respond(choices).catch(console.error);
    },
	run: async (client, interaction) => {
        const animal = interaction.options.get('animal').value;
        if(animal) interaction.reply({ content: `${interaction.user}, You chose **${animal}**!` });
	}
};