const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder, SelectMenuComponent, Moda } = require('discord.js');

module.exports = {
    id: 'roulette_menu',
    permissions: [],
    run: async (client, interaction) => {

        /*
        //create a modal
        const modal = new ModalBuilder()
            .setTitle('Roulette')
            .setCustomId('roulette_modal')

        //create a multi-select menu with 3 colours (red, green, black)
        

        //add the menu to the modal
            
            //create a number input
        const numberInput = new TextInputBuilder()
            .setCustomId('number_input')
            .setPlaceholder('Money to bet') 

        //add the number input to the modal
        modal.addComponents(new ActionRowBuilder().addComponents(menu))
        modal.addComponents(new ActionRowBuilder().addComponents(numberInput))


        //send the modal
        interaction.showModal(modal);

        */

        const modal = new ModalBuilder()
            .setCustomId('money_bet')
            .setTitle('Money to bet');


        // Add components to modal

        // Create the text input components

        const numberInput = new TextInputBuilder()
            .setCustomId('number_input')
            .setLabel('Money to bet')
            .setStyle(TextInputStyle.Short)


        // Add the text input components to the modal
        modal.addComponents(new ActionRowBuilder().addComponents(numberInput));


        // Show the modal to the user
        await interaction.showModal(modal);
    }
}