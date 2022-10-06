const fs = require('fs');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
module.exports = (client) => {

    client.casino = {}

    client.casino.config = JSON.parse(fs.readFileSync('./casino.json', 'utf8'));

    client.casino.save = () => {
        fs.writeFileSync('./casino.json', JSON.stringify(client.casino.config, null, 4), 'utf8');
    }

    client.casino.getBalance = (id) => {
        if (!client.casino.config.users[id]) {
            client.casino.config.users[id] = {
                balance: 100
            }
        }
        client.casino.save();
        return client.casino.config.users[id].balance;
    }

    client.casino.addBalance = (id, amount) => {
        if (!client.casino.config.users[id]) {
            client.casino.config.users[id] = {
                balance: 100
            }
        }
        client.casino.config.users[id].balance += amount;
        client.casino.save();
    }

    client.casino.removeBalance = (id, amount) => {
        if (!client.casino.config.users[id]) {
            client.casino.config.users[id] = {
                balance: 100
            }
        }
        client.casino.config.users[id].balance -= amount;
        client.casino.save();
    }

    //set balance
    client.casino.setBalance = (id, amount) => {
        if (!client.casino.config.users[id]) {
            client.casino.config.users[id] = {
                balance: 100
            }
        }
        client.casino.config.users[id].balance = amount;
        client.casino.save();
    }


    if (!client.casino.config.users) {
        client.casino.config.users = {};
    }

    client.casino.config.roulette = {
        users: {},
        timer: false,
        message: client.casino.config.roulette.message ? client.casino.config.roulette.message : {},
    }

    client.casino.config.speedsmash = {
        users: {},
        timer: false,
        message: client.casino.config.speedsmash?.message ? client.casino.config.speedsmash.message : {},
    }

    client.casino.save();


    client.casino.rouletteEmbed = async () => {

        //get players in the game
        const players = Object.keys(client.casino.config.roulette.users);
        //create a string of the players with their bets
        let playersString = "";
        for (const player of players) {
            const user = client.users.cache.get(player) || await client.users.fetch(player);
            //if bet amount is 0 say they are placing a bet
            if (client.casino.config.roulette.users[player].moneyBet == 0) {
                playersString += `${user.toString()} is placing a bet on ${client.casino.config.roulette.users[player].colourBet}\n`;
            } else {
            playersString += `${user.toString()}: Bet ${client.casino.config.roulette.users[player].moneyBet} on ${client.casino.config.roulette.users[player].colourBet}\n`;
            }
        }

        //get the time
        var time = client.casino.config.roulette.timer;

        console.log(time)

        if(time == false){ 
            time = "Waiting for players";
        } else {
        var date = new Date(null);
        date.setSeconds(time*5); 
        time = `${date.getMinutes()} ${date.getMinutes() == 1 ? "minute" : "minutes"} and ${date.getSeconds()} seconds`;
        }

        

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('roulette_button')
                    .setLabel('Join')
                    .setStyle(3)
            );

        //create embed
        const embed = new EmbedBuilder()
            .setTitle('Roulette')
            .setDescription('Click the button to join the roulette game')
            //add field with the rules (user discordjs v14)

            .addFields({
                name: 'Rules',
                value: 'You can bet on red, black or green. If you win, you get 2x your bet. If you lose, you lose your bet. If you bet on green and win, you get 17x your bet. If you bet on green and lose, you lose your bet.'
            })
            //add field with the current players
            .addFields({ name: 'Current players', value: (playersString.length > 0 ? playersString : "No players yet") })
            //add field with the time left
            .addFields({ name: 'Starting in', value: time })

            //add images
            .setImage('https://cdn.discordapp.com/attachments/1017374733370675201/1022050812119240734/unknown.png')
            //add purple color
            .setColor(0x9b59b6)
        return { embed, row };
    }


}