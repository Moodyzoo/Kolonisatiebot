const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
var youtubeSuggest = require('youtube-suggest');
const yts = require('yt-search');
var ytSearch = require('yt-search')
module.exports = {
	name: 'stop',
	description: "Stop de muziek.",
	type: ApplicationCommandType.ChatInput,
	
    
	run: async (client, interaction) => {
        //check if the interaction is autocomplete
        if(interaction.isAutocomplete()) return console.log("Autocomplete");

        const connection = client.musicConnections?.get(interaction.guild.id);
        if(!connection) return interaction.reply({ content: `Er speelt geen muziek!` });
        
        connection.destroy();
        client.musicConnections.delete(guild.id);
        client.musicQueue[guild.id].shift();
        interaction.reply({ content: `Muziek gestopt!` });

	}
};