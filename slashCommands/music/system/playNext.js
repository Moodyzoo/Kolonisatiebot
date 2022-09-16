module.exports = (client, guild, interaction) => {

    if(!client.musicConnections) client.musicConnections = new Map();


    if (!client.musicConnections.has(guild.id)) {
        
        const channel = interaction.member.voice.channel;

        console.log(channel)

        const { joinVoiceChannel } = require('@discordjs/voice');

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        client.musicConnections.set(guild.id, connection);
    }
    this.play(client, guild);
}

exports.play = (client, guild) => {

    const ytdl = require('ytdl-core');

    console.log("yess")

    const { createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

    const player = createAudioPlayer();

    const connection = client.musicConnections.get(guild.id);

    //get the first song in the queue
    const song = client.musicQueue[guild.id][0];

    console.log(song);

    //create the audio resource
    const resource = createAudioResource(ytdl(song.url, { filter: 'audioonly' }));

    //play the song
    player.play(resource);

    //subscribe to the player
    connection.subscribe(player);

    //set the song to playing
    client.musicQueue[guild.id][0].playing = true;

    connection.skip = () => {
        player.stop();
        
    }

    client.musicConnections.set(guild.id, connection);

    //when the song ends
    player.on(AudioPlayerStatus.Idle, () => {
        client.musicQueue[guild.id].shift();
        //if there are more songs in the queue
        if(client.musicQueue[guild.id].length > 0) {
            //play the next song
            
            this.play(client, guild);
        } else {
            //leave the voice channel
            connection.destroy();
            client.musicConnections.delete(guild.id);
        }
    });


}