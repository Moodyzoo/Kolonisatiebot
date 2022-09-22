module.exports = {
    id: 'money_bet',
    permissions: [],
    run: async (client, interaction) => {
        //get the value of the text input
        const moneyBet = interaction.data.values[0];
        //get the user's balance
        interaction.reply(`You bet ${moneyBet}!`);
    }
}
