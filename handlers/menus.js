const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Select Menu\'s', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
    fs.readdirSync('./menus/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const menu = require(`../menus/${file}`)
        client.selectmenus.set(menu.id, menu)
		table.addRow(menu.id, '✅')
    })
		console.log(chalk.cyanBright(table.toString()))
};
