const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

exports.run = async (client, interaction) => {

    var em = await client.casino.rouletteEmbed()
    var mes = await interaction.channel.send({ embeds: [em.embed], components: [em.row] });

    //save the message id in the config
    client.casino.config.roulette.message = {
        id: mes.id,
        channel: mes.channel.id,
    }

}