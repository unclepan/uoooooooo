"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const periodical_1 = __importDefault(require("../../models/periodical"));
class PeriodicalCtl {
    async find(ctx) {
        const { size = 10, current = 1, query } = ctx.query;
        let page = Math.max(current * 1, 1) - 1;
        const pageSize = Math.max(size * 1, 1);
        const q = new RegExp(query);
        const other = Object.assign({}, ctx.query);
        delete other.size;
        delete other.current;
        delete other.query;
        const conditions = Object.assign({ title: q }, other);
        const count = await periodical_1.default.countDocuments(conditions);
        if (count < page * pageSize) {
            page = 0;
        }
        const data = await periodical_1.default.find(conditions)
            .limit(pageSize)
            .skip(page * pageSize)
            .sort({ 'updatedAt': -1 });
        ctx.body = {
            data,
            count,
            current: page + 1,
            size: pageSize
        };
    }
    async checkPeriodicalExist(ctx, next) {
        const periodical = await periodical_1.default.findById(ctx.params.id);
        if (!periodical) {
            ctx.throw(404, '期刊不存在');
        }
        ctx.state.periodical = periodical;
        await next();
    }
    async findById(ctx) {
        // pv统计
        await periodical_1.default.findByIdAndUpdate(ctx.params.id, { $inc: { pv: 1 } });
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
        const periodical = await periodical_1.default.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
        ctx.body = periodical;
    }
    async create(ctx) {
        ctx.verifyParams({
            pic: { type: 'string', required: true },
            title: { type: 'string', required: true },
            content: { type: 'string', required: true },
            author: { type: 'string', required: true },
            describe: { type: 'string', required: true }
        });
        const periodical = await new periodical_1.default(Object.assign({}, ctx.request.body)).save();
        ctx.body = periodical;
    }
    async update(ctx) {
        ctx.verifyParams({
            pic: { type: 'string', required: false },
            title: { type: 'string', required: false },
            content: { type: 'string', required: false },
            author: { type: 'string', required: false },
            describe: { type: 'string', required: false },
            topics: { type: 'array', required: false },
            popular: { type: 'boolean', required: false },
            auditStatus: { type: 'number', required: false }
        });
        await ctx.state.periodical.update(ctx.request.body);
        ctx.body = ctx.state.periodical;
    }
    async delete(ctx) {
        await periodical_1.default.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = new PeriodicalCtl();
//# sourceMappingURL=index.js.map