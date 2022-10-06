//command to drop money in chat
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');
module.exports = {
    name: 'drop',
    description: "Drop money in chat",
    permissions: [],
    options: [
        {
            name: 'amount',
            description: 'The amount of money you want to drop.',
            type: 4,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const amount = interaction.options.getInteger('amount');

        if(!amount) return interaction.reply({ content: "You must specify an amount to drop!", ephemeral: true });

        //no negative numbers
        if(amount < 0) return interaction.reply({ content: "You can't drop negative money!", ephemeral: true });

        //no decimals
        if(amount % 1 != 0) return interaction.reply({ content: "You can't drop decimals!", ephemeral: true });

        const balance = client.casino.getBalance(interaction.user.id);

        if(balance < amount) return interaction.reply({ content: "You don't have enough money to drop!", ephemeral: true });

        //create button
        const button = new ButtonBuilder()

            .setCustomId('drop_button')
            .setLabel('Pick up')
            .setStyle(3)
            .setEmoji('💰');

        const row = new ActionRowBuilder()
            .addComponents(button);


        const drop = new EmbedBuilder()
            
            .setAuthor({name:interaction.user.tag, iconURL:interaction.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**${interaction.user.toString()}** dropped **$${amount}**!`)
            .setTimestamp();
            //lime color
            drop.setColor(0x00ff00);

        interaction.reply({ embeds: [drop], components: [row] });


        var reply = await interaction.fetchReply();

        client.casino.removeBalance(interaction.user.id, amount);

        //open drop.json
        const drops = JSON.parse(fs.readFileSync('./drops.json', 'utf8'));

        //add drop to drop.json
        drops[reply.id] = {
            id: reply.id,
            user: interaction.user.id,
            amount: amount,
            channel: interaction.channel.id,
            author: {
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }
        }

        console.log(reply)

        //save drop.json
        fs.writeFileSync('./drops.json', JSON.stringify(drops, null, 4), 'utf8');


        
    }
}