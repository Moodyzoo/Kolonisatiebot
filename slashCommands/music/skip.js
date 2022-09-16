const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
var youtubeSuggest = require('youtube-suggest');
const yts = require('yt-search');
var ytSearch = require('yt-search')
module.exports = {
	name: 'skip',
	description: "Skip naar het volgende nummer.",
	type: ApplicationCommandType.ChatInput,

	run: async (client, interaction) => {
        //check if the interaction is autocomplete
        if(interaction.isAutocomplete()) return console.log("Autocomplete");

        const connection = client.musicConnections?.get(interaction.guild.id);
        if(!connection) return interaction.reply({ content: `Er speelt geen muziek!` });

        client.musicConnections.get(interaction.guild.id).skip();

        //check id there are more songs in the queue
        if(client.musicConnections.get(interaction.guild.id).queue.length > 0) {
                interaction.reply({ content: `Geskipt naar het volgende nummer!` });
                }
        else {
                interaction.reply({ content: `Er zijn geen nummers meer in de queue. Muziek is gestopt!` });
                }

	}
};