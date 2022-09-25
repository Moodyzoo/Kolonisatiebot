const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
	if (!interaction.isModalSubmit()) return;


    const modal = client.modals.get(interaction.customId);
    console.log(client.modals, interaction.customId)
    if (!modal) return;

    
    await modal.run(client, interaction);
    
});
