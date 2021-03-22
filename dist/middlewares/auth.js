"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../models/token"));
const config_1 = __importDefault(require("../config"));
const { secret } = config_1.default;
class Auth {
    constructor(level = 1) {
        this.level = level;
        Auth.USER = 8; // 普通用户
        Auth.ADMIN = 16; // 管理员
        Auth.SUPER_ADMIN = 32; // 超级管理员
    }
    get m() {
        return async (ctx, next) => {
            const { authorization: authorizationForHeader } = ctx.request.header; // 从header
            const authorizationForCookie = ctx.cookies.get('auth'); // 从cookies
            const authorization = authorizationForCookie || authorizationForHeader || '';
            const token = authorization.replace('Bearer ', '');
            const tm = await token_1.default.findOne({ token });
            if (tm) {
                try {
                    const user = jsonwebtoken_1.default.verify(token, secret);
                    if (user.scope < this.level) {
                        ctx.throw(403, '权限不足');
                    }
                    ctx.state.user = user; // 通常放一些用户信息
                }
                catch (err) {
                    // 401 未认证（err.name 等于 'TokenExpiredError' 是token已过期）
                    if (err.name === 'TokenExpiredError') {
                        await token_1.default.findByIdAndRemove(tm._id);
                    }
                    ctx.throw(401, '用户未通过验证');
                }
            }
            else {
                ctx.throw(401, '当前用户登陆不合法');
            }
            await next();
        };
    }
    get isLogin() {
        return async (ctx, next) => {
            const token = ctx.params.token;
            const tm = await token_1.default.findOne({ token });
            if (tm) {
                try {
                    const user = jsonwebtoken_1.default.verify(token, secret);
                    ctx.state.user = user; // 通常放一些用户信息
                    await next();
                }
                catch (err) {
                    await token_1.default.findByIdAndRemove(tm._id);
                    ctx.body = false;
                }
            }
            else {
                ctx.body = false;
            }
        };
    }
    static verifyToken(token) {
        try {
            jsonwebtoken_1.default.verify(token, secret);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map