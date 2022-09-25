const { id } = require("../../modals/roulette");

module.exports = async (client, interaction) => {
    //get the message id from the config
    const messageID = client.casino.config.roulette.message.id;
    //get the channel id from the interaction
    const channelID = interaction.channel.id;
    //get the channel
    const channel = client.channels.cache.get(channelID) || interaction.channel;
    //get the message
    const message = channel.messages.cache.get(messageID) || (await channel.messages.fetch(messageID)).first();
    //get the embed

    

    //run after 5 seconds


    require("./timer.js")(client, message);



}