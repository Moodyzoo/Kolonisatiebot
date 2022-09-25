//send the leaderboard embed
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'pay',
    description: 'Pay someone',
    options: [
        {
            name: 'user',
            description: 'The user you want to pay',
            type: 6,
            required: true
        },
        {
            name: 'amount',
            description: 'The amount you want to pay',
            type: 4,
            required: true

        }  
    ],
    run: async (client, interaction) => {
        //use client.casino.addBalance(user, amount) to add money to a user
        //use client.casino.removeBalance(user, amount) to remove money from a user
        //use client.casino.getBalance(user) to get the balance of a user
        //use client.casino.setBalance(user, amount) to set the balance of a user

        //get the user and amount
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        //check if its negative

        if (amount < 0) return interaction.reply({ content: 'You can\'t pay negative money!', ephemeral: true });

        //check if its a decimal

        if (amount % 1 !== 0) return interaction.reply({ content: 'You can\'t pay a decimal amount of money!', ephemeral: true });

        //check if the user is paying themselves    
        if (user.id === interaction.user.id) {                                                                                                                               
            return interaction.reply({ content: 'You can\'t pay yourself!', ephemeral: true });
        }

        //check if the user has enough money
        if (client.casino.getBalance(interaction.user.id) < amount) {
            return interaction.reply({ content: 'You don\'t have enough money!', ephemeral: true });
        }

        //remove the money from the user
        client.casino.removeBalance(interaction.user.id, amount);
        
        //add the money to the user
        client.casino.addBalance(user.id, amount);

        //send the message
        interaction.reply({ content: `You paid ${user.toString()} ${amount} coins!` });



    }
}