"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const advertisement_1 = __importDefault(require("../models/advertisement"));
class AdvertisementCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const q = new RegExp(ctx.query.q);
        const { auditStatus = 1 } = ctx.query; // 审核状态
        ctx.body = await advertisement_1.default.find({
            title: q,
            auditStatus
        })
            .limit(perPage)
            .skip(page * perPage);
    }
    async checkAdvertisementExist(ctx, next) {
        const advertisement = await advertisement_1.default.findById(ctx.params.id);
        if (!advertisement) {
            ctx.throw(404, '当前广告不存在');
        }
        ctx.state.advertisement = advertisement;
        await next();
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query;
        const selectFields = fields
            .split(';')
            .filter((f) => f)
            .map((f) => '+' + f)
            .join(' ');
        const populateStr = fields
            .split(';')
            .filter((f) => f)
            .map((f) => f)
            .join(' ');
        const advertisement = await advertisement_1.default.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
        ctx.body = advertisement;
    }
    async create(ctx) {
        ctx.verifyParams({
            pic: { type: 'string', required: true },
            title: { type: 'string', required: true },
            link: { type: 'string', required: true },
        });
        const advertisement = await new advertisement_1.default(Object.assign({}, ctx.request.body)).save();
        ctx.body = advertisement;
    }
    async update(ctx) {
        ctx.verifyParams({
            pic: { type: 'string', required: false },
            title: { type: 'string', required: false },
            link: { type: 'string', required: false },
        });
        await ctx.state.advertisement.update(ctx.request.body);
        ctx.body = ctx.state.advertisement;
    }
    async delete(ctx) {
        await advertisement_1.default.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = new AdvertisementCtl();
//# sourceMappingURL=advertisement.js.map