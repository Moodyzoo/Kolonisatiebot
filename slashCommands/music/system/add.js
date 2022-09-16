module.exports = async (client, url, interaction) => {
    const { EmbedBuilder } = require('discord.js');
    const ytdl = require('ytdl-core');
    const play = require('./playNext');

    guild = interaction.guild;

    if(!client.musicQueue) {
        client.musicQueue = {};
        console.log('musicQueue created');
    }
    
    if(!client.musicQueue[guild.id]) {
        client.musicQueue[guild.id] = [];
    }

    //valit the url
    if(!ytdl.validateURL(url)) {
        console.log("Invalid URL");
        return;
    }

    //get the video info
    let info = await ytdl.getInfo(url);

    var track = {
        url,
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0].url,
        duration: info.videoDetails.lengthSeconds,
        requestor: interaction.user.tag,
        playing: false
    }

    client.musicQueue[guild.id].push(track);

    if(!client.musicQueue[guild.id].length == 0) {
        play(client, guild , interaction);
        //reply to interaction that the song is playing
        const embed = new EmbedBuilder()
        .setTitle(`Nu aan het spelen: ${track.title}`)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setColor('#FF0000')
        .setFooter({text:`Aangevraagd door: ${track.requestor}`})
        .setTimestamp();
        interaction.editReply({ embeds: [embed] });


    } else {
        const embed = new EmbedBuilder()
        .setTitle(`Toegevoegd aan de wachtrij: ${track.title}`)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setColor('#FF0000')
        .setFooter({text:`Aangevraagd door: ${track.requestor}`})
        .setTimestamp();
        interaction.editReply({ embeds: [embed] });

    }
}
