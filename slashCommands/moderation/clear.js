//clear command
module.exports = {
    name: 'clear',
    description: 'Clear messages!',
    options: [
        {
            name: 'amount',
            description: 'The amount of messages you want to clear',
            type: 4,
            required: true
        }
    ],
    run: async (client, interaction) => {

        var amount = interaction.options.getInteger('amount');

        //check if the user has permission to use this command
        if(!client.isAdmin(interaction.member)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        if (!amount) return message.reply("Please enter the amount of messages that you want to clear!");
        if (isNaN(amount)) return message.reply("Please enter a real number!");

        if (amount > 100) return message.reply("You cannot delete more than 100 messages!");
        if (amount < 1) return message.reply("You must delete at least one message!");

        await interaction.channel.messages.fetch({ limit: amount }).then(messages => {
            interaction.channel.bulkDelete(messages);
        });
    }
}