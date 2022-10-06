
const { ActionRowBuilder, SelectMenuBuilder, SelectMenuComponent, Moda } = require('discord.js');

module.exports = {
    id: 'roulette_button',
    permissions: [],
    run: async (client, interaction) => {

        //return if the user has already bet
        if(client.casino.config.roulette.users[interaction.user.id]) if(client.casino.config.roulette.users[interaction.user.id].moneyBet > 0) return interaction.reply({ content: "You have already bet!", ephemeral: true });

        const modal = new ModalBuilder()
            .setCustomId('speedsmash_bet')
            .setTitle('Money to bet');


        // Add components to modal

        // Create the text input components

        const numberInput = new TextInputBuilder()
            .setCustomId('money_bet')
            .setLabel('Money to bet')
            .setMaxLength(1000)
            .setStyle(TextInputStyle.Short)


        // Add the text input components to the modal
        modal.addComponents(new ActionRowBuilder().addComponents(numberInput));


        // Show the modal to the user
        await interaction.showModal(modal);
    }
}

