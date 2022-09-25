const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, SelectMenuComponent, Moda } = require('discord.js');

module.exports = {
    id: 'roulette_menu',
    permissions: [],
    run: async (client, interaction) => {

        //get value of the select menu

        const selectMenu = interaction.values[0];

        if(!client.casino.config.roulette.users[interaction.user.id]) {
            client.casino.config.roulette.users[interaction.user.id] = {
                moneyBet: 0,
                colourBet: selectMenu
            }
        }

        //return if the user has already bet
        if(client.casino.config.roulette.users[interaction.user.id].moneyBet > 0) return interaction.reply({ content: "You have already bet!", ephemeral: true });
        //return if the gam is already started
        if(client.casino.config.roulette.ingame) return interaction.reply({ content: "The game has already started!", ephemeral: true });

        client.casino.config.roulette.users[interaction.user.id].colourBet = selectMenu;

        client.casino.save();

        const modal = new ModalBuilder()
            .setCustomId('money_bet')
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