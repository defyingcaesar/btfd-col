"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
const discord_bot_core_client_1 = require("discord-bot-core-client");
const client = new discord_bot_core_client_1.CoreClient({
    token: process.env.DISCORD_BOT_TOKEN,
    clientOptions: {
        intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
            discord_js_1.Intents.FLAGS.GUILD_INTEGRATIONS,
            discord_js_1.Intents.FLAGS.GUILD_WEBHOOKS,
            discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
            discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ],
    },
});
client.registerBotsIn(path_1.default.resolve(__dirname, "bots")).start();
