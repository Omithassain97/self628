require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

let interval = null;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.id !== client.user.id) return;

  const content = message.content.toLowerCase();

  if (content === "#start" && !interval) {
    interval = setInterval(() => {
      message.channel.send(".gacha");
    }, 11000); // Every 11 seconds
    message.channel.send("Started auto .gacha every 11 seconds.");
  }

  if (content === "#stop" && interval) {
    clearInterval(interval);
    interval = null;
    message.channel.send("Stopped auto .gacha.");
  }
});

client.login(process.env.TOKEN);
