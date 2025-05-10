require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel],
});

let interval = null;

client.on("ready", () => {
  console.log(`Selfbot logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.id !== client.user.id) return;

  const msg = message.content.trim().toLowerCase();

  if (msg === "#start" && !interval) {
    message.channel.send("Started auto .gacha every 11 seconds...");
    interval = setInterval(() => {
      message.channel.send(".gacha");
    }, 11000);
  }

  if (msg === "#stop" && interval) {
    clearInterval(interval);
    interval = null;
    message.channel.send("Stopped auto .gacha.");
  }
});

// Important: Do NOT prefix token with "Bot "
client.login(process.env.TOKEN);
