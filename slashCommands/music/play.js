const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
var youtubeSuggest = require('youtube-suggest');
const yts = require('yt-search');
var ytSearch = require('yt-search')
module.exports = {
	name: 'play',
	description: "Speel muziek af via youtube.",
	type: ApplicationCommandType.ChatInput,
	options: [
        {
            name: 'video',
            description: 'Zoek een video.',
            type: 3,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: (interaction, choices) => {

        //get user voice channel
        const channel = interaction.member.voice.channel;
        if(!channel) return interaction.respond([{ name: `Je moet in een spraakkanaal zitten om dit command te gebruiken!`, value: "novc"}]).catch(console.error);
        
        var focus = interaction.options.getFocused();

        if(!focus) return interaction.respond([{ name: `Begin met typen om te zoeken op Youtube`, value: "noin"}]).catch(console.error);;
        
        youtubeSuggest(focus).then(results => {
            results.forEach(result => {
                choices.push({
                    name: `${result}`,
                    value: `${result}`
                });
            });
            interaction.respond(choices).catch(console.error);
        });
    },
	run: async (client, interaction) => {
        //check if the interaction is autocomplete
        if(interaction.isAutocomplete()) return console.log("Autocomplete");

        const channel = interaction.member.voice.channel;
        if(!channel) return interaction.reply({ content: `Je moet in een spraakkanaal zitten om dit command te gebruiken!` });
        const video = interaction.options.get('video').value;
        if(video == "novc") return interaction.reply({ content: `Je moet in een spraakkanaal zitten om dit command te gebruiken!`, ephemeral: true });
        if(video == "noin") return interaction.reply({ content: `Je moet wel een zoekopdracht opgeven!`, ephemeral: true });
        const r = await ytSearch(video);
        var url = r.videos[0].url;
        
        interaction.deferReply();
        require('./system/add')(client, url, interaction);
	}
};