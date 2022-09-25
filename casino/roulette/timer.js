module.exports = async (client, message) => {
 console.log("Starting timer")
    const timer = client.casino.config.roulette.timer;
    if (timer) return updateEmbed()
    client.casino.config.roulette.timer = 12;
    client.casino.save();
    updateEmbed(timer);
    
    var timerInter = setInterval(() => {
        client.casino.config.roulette.timer--;
        client.casino.save();
        
        if (client.casino.config.roulette.timer == 0) {
            client.casino.config.roulette.timer = false;
            client.casino.config.roulette.ingame = true;
            client.casino.save();
            console.log("Timer ended")
            clearInterval(timerInter);
            return require("./game.js")(client);
        }
        updateEmbed(timer);
    }, 5000);

    async function updateEmbed() {

        var em = await client.casino.rouletteEmbed();
        //edit the message
        message.edit({ embeds: [em.embed], components: [em.row] });


    }
}