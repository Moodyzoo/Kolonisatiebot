const express = require('express');
module.exports = (client) => {

    client.app = express();

    client.app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    client.app.listen(8080, () => {
        console.log('Example app listening at http://localhost:8080');
    })

}