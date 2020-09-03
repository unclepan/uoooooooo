"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const term_1 = __importDefault(require("../models/term"));
class CarouselCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await term_1.default.find()
            .limit(perPage)
            .skip(page * perPage);
    }
    async checkTermExist(ctx, next) {
        const term = await term_1.default.findById(ctx.params.id);
        if (!term) {
            ctx.throw(404, '当前协议不存在');
        }
        ctx.state.term = term;
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
        const term = await term_1.default.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
        ctx.body = term;
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true }
        });
        const term = await new term_1.default(Object.assign({}, ctx.request.body)).save();
        ctx.body = term;
    }
    async update(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false }
        });
        await ctx.state.term.update(ctx.request.body);
        ctx.body = ctx.state.term;
    }
    async delete(ctx) {
        await term_1.default.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = new CarouselCtl();
//# sourceMappingURL=term.js.map