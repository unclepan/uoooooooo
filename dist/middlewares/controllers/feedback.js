"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_1 = __importDefault(require("../models/feedback"));
class FeedbackCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const q = new RegExp(ctx.query.q);
        ctx.body = await feedback_1.default.find({
            content: q
        })
            .limit(perPage)
            .skip(page * perPage);
    }
    async checkFeedbackExist(ctx, next) {
        const feedback = await feedback_1.default.findById(ctx.params.id);
        if (!feedback) {
            ctx.throw(404, '当前反馈不存在');
        }
        ctx.state.feedback = feedback;
        await next();
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true }
        });
        const feedback = await new feedback_1.default(Object.assign(Object.assign({}, ctx.request.body), { feedbacker: ctx.state.user._id })).save();
        ctx.body = feedback;
    }
    async delete(ctx) {
        await feedback_1.default.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = new FeedbackCtl();
//# sourceMappingURL=feedback.js.map