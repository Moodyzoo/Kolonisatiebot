const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,

	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

//set client.testmode to true if the commandline argument test is given
client.testmode = process.argv.includes('test');

console.log(process.argv);

if(client.testmode) {
	console.log("Testmode is enabled!");
}

const config = require('./config.json');
require('dotenv').config() // remove this line if you are using replit
const fs = require('fs');

client.commands = new Collection()
client.buttons = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.selectmenus = new Collection()
client.modals = new Collection()
client.prefix = config.prefix

module.exports = client;

client.isAdmin = (member) => {
	return config.admin.includes(member.id);
}



fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(process.env.TOKEN)
