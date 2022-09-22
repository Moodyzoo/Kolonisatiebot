const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;


    const menu = client.selectmenus.get(interaction.customId);
    console.log(client.selectmenus, interaction.customId)
    if (!menu) return;

    
    await menu.run(client, interaction);
    
});
