
const { ActionRowBuilder, SelectMenuBuilder, SelectMenuComponent, Moda } = require('discord.js');

module.exports = {
    id: 'roulette_button',
    permissions: [],
    run: async (client, interaction) => {
        const menu = new SelectMenuBuilder()
            .setCustomId('roulette_menu')
            .setPlaceholder('Choose a colour')
            .addOptions([
                {
                    label: 'Red',
                
                    value: 'red',
                    emoji: '🟥'
                },
                {
                    label: 'Green',
                    
                    value: 'green',
                    emoji: '🟩'
                },
                {
                    label: 'Black',
                    
                    value: 'black',
                    emoji: '⬛'
                }
            ]);

        const row = new ActionRowBuilder()
            .addComponents(menu);

        interaction.reply({ content: 'Roulette test!', components: [row], ephemeral: true });
    }
}

