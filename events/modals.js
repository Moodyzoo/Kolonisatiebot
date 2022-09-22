const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectmodal()) return;


    const modal = client.selectmodals.get(interaction.customId);
    console.log(client.selectmodals, interaction.customId)
    if (!modal) return;

    
    await modal.run(client, interaction);
    
});
