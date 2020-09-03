"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const privacy_1 = __importDefault(require("../models/privacy"));
class CarouselCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await privacy_1.default.find()
            .limit(perPage)
            .skip(page * perPage);
    }
    async checkPrivacyExist(ctx, next) {
        const privacy = await privacy_1.default.findById(ctx.params.id);
        if (!privacy) {
            ctx.throw(404, '当前隐私保护指引不存在');
        }
        ctx.state.privacy = privacy;
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
        const privacy = await privacy_1.default.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
        ctx.body = privacy;
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true }
        });
        const privacy = await new privacy_1.default(Object.assign({}, ctx.request.body)).save();
        ctx.body = privacy;
    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false }
        });
        await ctx.state.privacy.update(ctx.request.body);
        ctx.body = ctx.state.privacy;
    }
    async delete(ctx) {
        await privacy_1.default.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = new CarouselCtl();
//# sourceMappingURL=privacy.js.map