const { EmbedBuilder } = require("discord.js");
module.exports = async (client) => {

    var groen = [0];
    var rood = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    var zwart = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    //get a random number betweet 0 and 36
    var random = Math.floor(Math.random() * 37);
    //get the color
    var color = groen.includes(random) ? "green" : rood.includes(random) ? "red" : "black";

    //get players in the game
    const players = Object.keys(client.casino.config.roulette.users);
    //create a string of the players with their bets
    let playersString = "";
    for (const player of players) {
        const user = client.users.cache.get(player) || await client.users.fetch(player);
        
        //remove players who have bet 0
        if (client.casino.config.roulette.users[player].moneyBet == 0) {
            delete client.casino.config.roulette.users[player];
        } else {
            playersString += `${user.toString()}: Bet ${client.casino.config.roulette.users[player].moneyBet} on ${client.casino.config.roulette.users[player].colourBet}\n`;
        }
    }

    var channelID = client.casino.config.roulette.message.channel;

    const channel = client.channels.cache.get(channelID) || await client.channels.fetch(channelID);

    var messageID = client.casino.config.roulette.message.id;
    //get the message
    const message = channel.messages.cache.get(messageID) || (await channel.messages.fetch(messageID)).first();

    var embed = new EmbedBuilder()
        .setTitle("Roulette")
        .setDescription("***The ball is rolling...***")
        //purple
        .setColor(0x9b59b6)
        .addFields({ name: 'Current players', value: (playersString.length > 0 ? playersString : "No players yet") })
        .setImage("https://media.discordapp.net/attachments/1017374733370675201/1022050932550270986/Roulette.gif")

    //edit the message
    message.edit({ embeds: [embed], components: [] });

    //wait 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    //create a string of the players with their bets
    playersString = "";
    for (const player of players) {
        const user = client.users.cache.get(player) || await client.users.fetch(player);
        playersString += `${user.toString()}: Bet ${client.casino.config.roulette.users[player].moneyBet} on ${client.casino.config.roulette.users[player].colourBet}\n`;
    }

    //create a string of the winners
    let winnersString = "";
    for (const player of players) {
        const user = client.users.cache.get(player) || await client.users.fetch(player);
        if (client.casino.config.roulette.users[player].colourBet == color) {
            if (client.casino.config.roulette.users[player].colourBet == "green") {
                winnersString += `${user.toString()}: Won ${client.casino.config.roulette.users[player].moneyBet * 17}\n`;
                client.casino.config.roulette.users[player].moneyBet *= 17;
                client.casino.addBalance(player, client.casino.config.roulette.users[player].moneyBet);
            } else {
                
                winnersString += `${user.toString()}: Won ${client.casino.config.roulette.users[player].moneyBet * 2}\n`;
                client.casino.config.roulette.users[player].moneyBet *= 2;
                client.casino.addBalance(user.id, client.casino.config.roulette.users[player].moneyBet);
            }
        }
    }

    //create a string of the losers
    let losersString = "";
    for (const player of players) {
        const user = client.users.cache.get(player) || await client.users.fetch(player);
        if (client.casino.config.roulette.users[player].colourBet != color) {
            losersString += `${user.toString()}: Lost ${client.casino.config.roulette.users[player].moneyBet}\n`;
        }
    }

    //get emoji for the color
    const emoji = color == "green" ? "🟢" : color == "red" ? "🔴" : "⚫";

    embed = new EmbedBuilder()
        .setTitle("Roulette")
        .setDescription(`***The ball landed on a ${color} ${random}! ${emoji}***`)
        //purple
        .setColor(0x9b59b6)
        .addFields({ name: 'Winners', value: (winnersString.length > 0 ? winnersString : "No winners") })
        .addFields({ name: 'Losers', value: (losersString.length > 0 ? losersString : "No losers") })
        .setImage("https://cdn.discordapp.com/attachments/1017374733370675201/1022050812119240734/unknown.png")

    //edit the message
    message.edit({ embeds: [embed], components: [] });

    //wait 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    //reset the game
    client.casino.config.roulette.users = {};
    client.casino.config.roulette.ingame = false;

    var newEmbed = await client.casino.rouletteEmbed();

    //edit the message
    message.edit({ embeds: [newEmbed.embed], components: [newEmbed.row] });


}