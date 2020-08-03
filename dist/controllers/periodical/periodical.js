"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const periodical_1 = __importDefault(require("../../models/periodical/periodical"));
class PeriodicalCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const q = new RegExp(ctx.query.q);
        const { auditStatus = 1 } = ctx.query; // 审核状态
        const { popular = false } = ctx.query; // 是否推荐
        ctx.body = await periodical_1.default.find({
            $or: [{ title: q }, { description: q }],
            auditStatus,
            popular
        })
            .limit(perPage)
            .skip(page * perPage);
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
    async import(ctx) {
        const arr = ctx.request.body.map(item => {
            return {
                pic: `/periodical/2019112/${item.caseId}/${item.imgUrl}`,
                title: item.title,
                content: item.content,
                author: item.author,
                describe: item.describe,
                auditStatus: 1
            };
        });
        const periodicals = await periodical_1.default.insertMany(arr);
        ctx.body = periodicals;
    }
}
exports.default = new PeriodicalCtl();
//# sourceMappingURL=periodical.js.map