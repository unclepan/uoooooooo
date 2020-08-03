"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const bp_1 = __importDefault(require("../models/bp"));
const moment_1 = __importDefault(require("moment"));
class HomeCtl {
    index(ctx) {
        ctx.body = '接口';
    }
    async bpCreate(ctx) {
        const { data } = ctx.request.body;
        const v = JSON.parse(data);
        for (let i = 0; i < v.length; i++) {
            new bp_1.default({
                bp: Object.assign(Object.assign({}, v[i]), { tFom: moment_1.default(v[i].t).format('YYYY/MM/DD HH:mm:ss') }),
            }).save();
        }
        ctx.body = { mas: '埋点测试' };
    }
    async bpFind(ctx) {
        ctx.body = await bp_1.default.find();
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