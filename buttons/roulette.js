
const { ActionRowBuilder, SelectMenuBuilder, SelectMenuComponent, Moda } = require('discord.js');

module.exports = {
    id: 'roulette_button',
    permissions: [],
    run: async (client, interaction) => {

        //return if the user has already bet
        if(client.casino.config.roulette.users[interaction.user.id]) if(client.casino.config.roulette.users[interaction.user.id].moneyBet > 0) return interaction.reply({ content: "You have already bet!", ephemeral: true });

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

