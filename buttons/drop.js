const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
var fs = require('fs');
module.exports = {
	id: 'drop_button',
	permissions: [],
	run: async (client, interaction) => {
		//get message id
        const messageID = interaction.message.id;
        //get drop from drop.json
        const drops = JSON.parse(fs.readFileSync('./drops.json', 'utf8'));
        const drop = drops[messageID];

        //if the drop doesn't exist, return
        if(!drop) return interaction.reply({ content: "This drop doesn't exist or is already claimed!", ephemeral: true });
        
        //add money to user
        client.casino.addBalance(interaction.user.id, drop.amount);
        //delete drop from drop.json
        delete drops[messageID];
        //save drop.json
        fs.writeFileSync('./drops.json', JSON.stringify(drops, null, 4), 'utf8');
        //edit drop message

        //create button
        const button = new ButtonBuilder()

            .setCustomId('drop_button')
            .setLabel('Pick up')
            .setStyle(3)
            .setEmoji('💰')
            .setDisabled(true);

        const row = new ActionRowBuilder()
            .addComponents(button);

        const dropMessage = await interaction.channel.messages.fetch(messageID);
        const dropEmbed = new EmbedBuilder()
            .setAuthor({name:drop.author.name, iconURL:drop.author.iconURL})
            //claim message
            .setDescription(`**${interaction.user.toString()}** claimed **$${drop.amount}** from **<@${drop.user}>**!`)
            .setTimestamp();
            //light red color
            dropEmbed.setColor(0xff0000);
            

        dropMessage.edit({ embeds: [dropEmbed], components: [row] });


        //reply to interaction with success message
        interaction.reply({ content: `You picked up **$${drop.amount}**!`, ephemeral: true });


	}
};
