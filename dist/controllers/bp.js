"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bp_1 = __importDefault(require("../models/bp"));
const moment_1 = __importDefault(require("moment"));
const utils_1 = __importDefault(require("../common/utils"));
class BpCtl {
    async create(ctx) {
        const { data } = ctx.request.body;
        const unzipData = process.env.NODE_ENV === 'production' ? utils_1.default.unzip(data) : data;
        const v = JSON.parse(unzipData);
        for (let i = 0; i < v.length; i++) {
            new bp_1.default({
                bp: Object.assign(Object.assign({}, v[i]), { tFom: moment_1.default(v[i].t).format('YYYY/MM/DD HH:mm:ss') }),
            }).save();
        }
        ctx.body = { mas: '埋点测试' };
    }
    async find(ctx) {
        ctx.body = await bp_1.default.find();
    }
}
exports.default = new BpCtl();
//# sourceMappingURL=bp.js.map