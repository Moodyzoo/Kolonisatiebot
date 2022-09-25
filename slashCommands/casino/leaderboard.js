//send the leaderboard embed
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'leaderboard',
    description: 'Sends the leaderboard',
    run: async (client, interaction) => {
        const casino = JSON.parse(fs.readFileSync('./casino.json', 'utf8'));
        const sorted = Object.keys(casino.users).sort((a, b) => casino[b].balance - casino[a].balance);
        const top10 = sorted.splice(0, 10);
        const embed = new Discord.EmbedBuilder()
            .setTitle('Leaderboard')
            .setColor("#00ff00")
            .setTimestamp();
        for (const data of top10) {
            const user = client.users.cache.get(data) || await client.users.fetch(data);
            embed.addFields({name: user.tag, value: casino[data].balance + ""});
        }
        interaction.reply({ embeds: [embed] });
    }
}