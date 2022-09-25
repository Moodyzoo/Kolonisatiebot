//use discord-blackjack to play blackjack

const Discord = require('discord.js');
const fs = require('fs');
const discordBlackjack = require('discord-blackjack');
module.exports = {
    name: 'blackjack',
    description: 'Play blackjack',
    options: [
        {
            name: 'bet',
            description: 'The amount you want to bet',
            type: 4,
            required: true
        }
    ],
    run: async (client, interaction) => {
        //get the bet
        const bet = interaction.options.getInteger('bet');
        //check if the bet is negative
        if (bet < 0) return interaction.reply({ content: 'You can\'t bet negative money!', ephemeral: true });
        //check if the bet is a decimal
        if (bet % 1 !== 0) return interaction.reply({ content: 'You can\'t bet a decimal amount of money!', ephemeral: true });
        //check if the user has enough money
        if (client.casino.getBalance(interaction.user.id) < bet) return interaction.reply({ content: 'You don\'t have enough money!', ephemeral: true });
        //remove the money from the user
        client.casino.removeBalance(interaction.user.id, bet);
        //create the blackjack game
        const game = await discordBlackjack(interaction)
    }
}