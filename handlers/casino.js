const fs = require('fs');
module.exports = (client) => {

    client.casino = {}

    client.casino.config = JSON.parse(fs.readFileSync('./casino.json', 'utf8'));

    client.casino.save = () => {
        fs.writeFileSync('./casino.json', JSON.stringify(client.casino.config, null, 4), 'utf8');
    }

    client.casino.getBalance = (id) => {
        if (!client.casino.config[id]) {
            client.casino.config[id] = {
                balance: 100
            }
        }
        client.casino.save();
        return client.casino.config[id].balance;
    }

}