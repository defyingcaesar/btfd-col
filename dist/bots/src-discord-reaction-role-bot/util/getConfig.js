"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const config_json_1 = __importDefault(require("../config.json"));
const configMap = new Map();
config_json_1.default.forEach((config) => {
    configMap.set(config.messageId, config);
});
function getConfig(message) {
    if (!configMap.has(message.id)) {
        return;
    }
    return configMap.get(message.id);
}
exports.getConfig = getConfig;
