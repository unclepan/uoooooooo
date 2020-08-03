"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const answers_1 = __importDefault(require("../../models/answers/answers"));
const users_1 = __importDefault(require("../../models/users"));
const comments_1 = __importDefault(require("../../models/answers/comments"));
class AnswersCtl {
    async find(ctx) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const q = new RegExp(ctx.query.q);
        const { questionId } = ctx.params;
        const { auditStatus = 1 } = ctx.query; // 审核状态
        ctx.body = await answers_1.default.find({
            content: q,
            questionId,
            auditStatus
        })
            .limit(perPage)
            .skip(page * perPage);
    }
    async popular(ctx, next) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const q = new RegExp(ctx.query.q);
        const { auditStatus = 1 } = ctx.query; // 审核状态
        const { popular = true } = ctx.query; // 是否推荐
        ctx.state.answer = await answers_1.default.find({
            content: q,
            auditStatus,
            popular
        })
            .limit(perPage)
            .skip(page * perPage)
            .select('+answerer')
            .populate('questionId answerer');
        await next();
    }
    async info(ctx, next) {
        const { per_page = 10 } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        const q = new RegExp(ctx.query.q);
        const { questionId } = ctx.params;
        const { auditStatus = 1 } = ctx.query; // 审核状态
        ctx.state.answer = await answers_1.default.find({
            content: q,
            questionId,
            auditStatus
        })
            .limit(perPage)
            .skip(page * perPage)
            .select('+answerer')
            .populate('questionId answerer');
        await next();
    }
    async assInfo(ctx) {
        const me = await users_1.default.findById(ctx.state.user._id).select('likingAnswers dislikingAnswers collectingAnswers');
        ctx.body = await Promise.all(ctx.state.answer.map(async (item) => {
            return (async () => {
                const commentNum = await comments_1.default.countDocuments({ answerId: item._id, rootCommentId: undefined, auditStatus: 1 });
                const isLike = !!me.likingAnswers.find(i => i.toString() === item._id.toString());
                const isDislike = !!me.dislikingAnswers.find(i => i.toString() === item._id.toString());
                const isCollect = !!me.collectingAnswers.find(i => i.toString() === item._id.toString());
                const { pic, content, answerer, questionId, voteCount } = item;
                return {
                    id: item._id,
                    pic,
                    content,
                    answerer,
                    questionId,
                    voteCount,
                    isLike,
                    isDislike,
                    isCollect,
                    commentNum,
                    showComments: false
                };
            })();
        }));
    }
    async checkAnswerExist(ctx, next) {
        const answer = await answers_1.default.findById(ctx.params.id).select('+answerer +questionId');
        if (!answer) {
            ctx.throw(404, '答案不存在');
        }
        // 只有删改查答案时候才检查此逻辑，赞、踩答案的时候不检查
        if (ctx.params.questionId && answer.questionId.toString() !== ctx.params.questionId) {
            ctx.throw(404, '该问题下没有此答案');
        }
        ctx.state.answer = answer;
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
        const answer = await answers_1.default.findById(ctx.params.id)
            .select(selectFields)
            .populate(populateStr);
        ctx.body = answer;
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true }
        });
        const answerer = ctx.state.user._id;
        const { questionId } = ctx.params;
        const answer = await new answers_1.default(Object.assign(Object.assign({}, ctx.request.body), { answerer,
            questionId })).save();
        ctx.body = answer;
    }
    async checkAnswerer(ctx, next) {
        const { answer } = ctx.state;
        if (answer.answerer.toString() !== ctx.state.user._id) {
            ctx.throw(403, '没有权限，该答案不等于当前登录用户');
        }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            pic: { type: 'string', required: false },
            content: { type: 'string', required: false },
            popular: { type: 'boolean', required: false },
            auditStatus: { type: 'number', required: false }
        });
        await ctx.state.answer.update(ctx.request.body);
        ctx.body = ctx.state.answer;
    }
    async delete(ctx) {
        await answers_1.default.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = new AnswersCtl();
//# sourceMappingURL=answers.js.map