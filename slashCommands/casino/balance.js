//command that sends the users balance
module.exports = {
    name: 'balance',
    description: 'Sends the users balance',
    run: async (client, interaction) => {
        const balance = client.casino.getBalance(interaction.user.id);
        interaction.reply({ content: `Your balance is ${balance}`, ephemeral: true });
    }
}