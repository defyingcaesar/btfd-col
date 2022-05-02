"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../config.json"));
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(__dirname.split("\\").slice(-2)[0]);
    for (const config of config_json_1.default) {
        const channel = yield client.channels.fetch(config.channelId);
        if (!channel || channel.type === "DM") {
            continue;
        }
        const message = yield channel.messages.fetch(config.messageId);
        Object.keys(config.emojiRoleMap).forEach((emoji) => __awaiter(void 0, void 0, void 0, function* () { return yield message.react(emoji); }));
    }
});
