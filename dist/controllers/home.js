"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class HomeCtl {
    index(ctx) {
        ctx.body = '接口';
    }
    upload(ctx) {
        const file = ctx.request.files.file;
        const basename = path_1.default.basename(file.path);
        ctx.body = {
            url: `${ctx.origin}/uploads/${basename}`
        };
    }
}
exports.default = new HomeCtl();
//# sourceMappingURL=home.js.map