//create a command that remebers a title and value from a modal
module.exports = {
    name: 'remember',
    description: 'Remembers a title and value',
    options: [
        {
            name: 'title',
            description: 'The title of the thing you want to remember',
            type: 3,
            required: true
        },
        {
            name: 'value',
            description: 'The value of the thing you want to remember',
            type: 3,
            required: true
        }

    ],
    run: async (client, interaction) => {
        const title = interaction.options.getString('title');
        const value = interaction.options.getString('value');

        client.db.set(title, value);

        interaction.reply({ content: `I have remembered ${title} as ${value}`, ephemeral: true });
    }
}
