"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_1 = __importDefault(require("../models/monitor"));
const moment_1 = __importDefault(require("moment"));
class MonitorCtl {
    async create(ctx) {
        const { data } = ctx.request.body;
        const v = JSON.parse(data);
        for (let i = 0; i < v.length; i++) {
            new monitor_1.default({
                monitor: Object.assign(Object.assign({}, v[i]), { tFom: moment_1.default(v[i].t).format('YYYY/MM/DD HH:mm:ss') }),
            }).save();
        }
        ctx.body = { mas: '埋点提交成功' };
        // const {data} = ctx.request.body;
        // const v = JSON.parse(data);
        // try {
        //   for (let i = 0; i < v.length; i++) {
        //     new Monitor({
        //       monitor: {...v[i], tFom: moment(v[i].t).format('YYYY/MM/DD HH:mm:ss')},
        //     }).save();
        //   }
        //   ctx.body = { mas: '监控数据存储成功' };
        // } catch (error) {
        //   ctx.throw(503, error);
        // }
    }
    async find(ctx) {
        ctx.body = await monitor_1.default.find();
    }
}
exports.default = new MonitorCtl();
//# sourceMappingURL=monitor.js.map