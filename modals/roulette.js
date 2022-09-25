module.exports = {
    id: 'money_bet',
    permissions: [],
    run: async (client, interaction) => {
        //return if the user has already bet
        if(client.casino.config.roulette.users[interaction.user.id].moneyBet > 0) return interaction.reply({ content: "You have already bet!", ephemeral: true });
        if(client.casino.config.roulette.ingame) return interaction.reply({ content: "The game has already started!", ephemeral: true });
        //get the balance of the user
        const balance = await client.casino.getBalance(interaction.user.id);
        //get the value of the text input
        const moneyBet = interaction.fields.getTextInputValue('money_bet');
        //check if its a number
        if(isNaN(moneyBet)) return interaction.reply({ content: 'Please enter a number', ephemeral: true });
        //check if the number is negative
        if(moneyBet < 0) return interaction.reply({ content: 'No infinite money glitch here! ;)', ephemeral: true });
        //ceck if its with a decimal
        if(moneyBet % 1 != 0) return interaction.reply({ content: 'Please enter a whole number', ephemeral: true });

        //if the user doesn't have enough money
        if (moneyBet > balance) {
            //send an error message
            interaction.reply({content: 'You don\'t have enough money!', ephemeral: true});
            //return
            return;
        }
        //get the user's balance
        client.casino.removeBalance(interaction.user.id, moneyBet);
        //send a message
        interaction.reply({content:`You bet ${moneyBet}!`, ephemeral: true});

        client.casino.config.roulette.users[interaction.user.id].moneyBet = parseInt(moneyBet);

        client.casino.save();

        require("../casino/roulette/join.js")(client, interaction);
    }
}
