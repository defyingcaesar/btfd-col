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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionRoleManager = void 0;
class ReactionRoleManager {
    constructor(messageReaction, user, config) {
        this.messageReaction = messageReaction;
        this.user = user;
        this.config = config;
        this.roleIds = undefined;
        this.member = undefined;
    }
    get emoji() {
        return (this.messageReaction.emoji.id ||
            this.messageReaction.emoji.name);
    }
    get ruleRoleIds() {
        return [...new Set(Object.values(this.config.emojiRoleMap).flat())];
    }
    setRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this._validateInput())) {
                return;
            }
            yield this._handleUserReaction();
            switch (this.config.policy) {
                case "once":
                    return this._memberHasSomeRoleInRuleRoles()
                        ? undefined
                        : this._addRolesToMember();
                case "any":
                    return this._memberHasEveryRoleInRoles()
                        ? this._removeRolesFromMember()
                        : this._addRolesToMember();
                case "unique":
                default:
                    return this._memberHasEveryRoleInRoles()
                        ? this._removeRolesFromMember()
                        : this._setRolesToMember();
            }
        });
    }
    _validateInput() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config ||
                this.user.bot ||
                this.messageReaction.message.channel.type === "DM") {
                return false;
            }
            if (!this._setRoleIds() || !(yield this._setMember())) {
                return false;
            }
            return true;
        });
    }
    _setRoleIds() {
        this.roleIds = this.config.emojiRoleMap[this.emoji];
        return Boolean(this.roleIds);
    }
    _setMember() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.member = yield ((_a = this.messageReaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(this.user));
            return Boolean(this.member);
        });
    }
    _handleUserReaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.removeReaction) {
                this.messageReaction.users.remove(this.user);
            }
        });
    }
    _memberHasSomeRoleInRuleRoles() {
        return this.ruleRoleIds.some((roleId) => this.member.roles.cache.has(roleId));
    }
    _memberHasEveryRoleInRoles() {
        return this.roleIds.every((roleId) => this.member.roles.cache.has(roleId));
    }
    _removeRolesFromMember() {
        return __awaiter(this, void 0, void 0, function* () {
            this.member.roles.remove(this.roleIds);
        });
    }
    _addRolesToMember() {
        return __awaiter(this, void 0, void 0, function* () {
            this.member.roles.add(this.roleIds);
        });
    }
    _setRolesToMember() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentRoleIds = this.member.roles.cache.map((role) => role.id);
            const roleIdsToSet = [
                ...currentRoleIds.filter((roleId) => !this.ruleRoleIds.includes(roleId)),
                ...this.roleIds,
            ];
            this.member.roles.set(roleIdsToSet);
        });
    }
}
exports.ReactionRoleManager = ReactionRoleManager;
