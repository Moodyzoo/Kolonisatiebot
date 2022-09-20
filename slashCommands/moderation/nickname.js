//change nickname of a user
module.exports = {
    name: 'nickname',
    description: 'Change the nickname of a user',
    options: [
        {
            name: 'user',
            description: 'The user you want to change the nickname of',
            type: 6,
            required: true
        },
        {
            name: 'nickname',
            description: 'The nickname you want to change to',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user');
        const nickname = interaction.options.getString('nickname');

        //check if the bot has permission to change the nickname
        //if(!interaction.guild.me.permissions.has('MANAGE_NICKNAMES')) return interaction.reply({ content: `I don't have permission to change the nickname of ${user.username}`, ephemeral: true });

        interaction.guild.members.cache.get(user.id).setNickname(nickname);

        interaction.reply({ content: `I have changed the nickname of ${user.username} to ${nickname}`, ephemeral: true });
    }
}