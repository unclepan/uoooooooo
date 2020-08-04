"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const users_1 = __importDefault(require("../controllers/users"));
const topics_1 = __importDefault(require("../controllers/topics"));
const questions_1 = __importDefault(require("../controllers/questions"));
const answers_1 = __importDefault(require("../controllers/answers"));
const periodical_1 = __importDefault(require("../controllers/periodical"));
const router = new koa_router_1.default({ prefix: '/api/users' });
const { find, findById, fundByName, verify, create, update, delete: del, login, logout, checkOwner, listFollowing, listFollowers, checkUserExist, follow, unfollow, listFollowingTopic, followTopic, unfollowTopic, listQuestions, listFollowingQuestion, followQuestion, unfollowQuestion, listLikingAnswers, likeAnswer, unLikeAnswer, listDisLikingAnswers, disLikeAnswer, unDisLikeAnswer, listCollectingAnswers, collectAnswer, unCollectAnswer, likePeriodical, unLikePeriodical, whetherLikePeriodical } = users_1.default;
const { checkTopicExist } = topics_1.default;
const { checkQuestionExist } = questions_1.default;
const { checkAnswerExist } = answers_1.default;
const { checkPeriodicalExist } = periodical_1.default;
router.get('/', new auth_1.default(7).m, find);
router.post('/', create);
router.get('/:id', findById);
router.get('/fund/name', fundByName);
router.get('/login/info', new auth_1.default().m, async (ctx, next) => {
    ctx.params.id = ctx.state.user._id;
    await next();
}, findById);
router.patch('/:id', new auth_1.default().m, checkOwner, update);
router.delete('/:id', new auth_1.default().m, checkOwner, del);
router.post('/verify', verify);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:id/following', listFollowing);
router.get('/:id/followins', listFollowers);
router.put('/following/:id', new auth_1.default().m, checkUserExist, follow);
router.delete('/following/:id', new auth_1.default().m, checkUserExist, unfollow);
router.get('/:id/followingTopics', listFollowingTopic);
router.put('/followingTopics/:id', new auth_1.default().m, checkTopicExist, followTopic);
router.delete('/followingTopics/:id', new auth_1.default().m, checkTopicExist, unfollowTopic);
router.get('/:id/followQuestions', listFollowingQuestion); // 用户关注问题的列表
router.put('/followQuestions/:id', new auth_1.default().m, checkQuestionExist, followQuestion);
router.delete('/followQuestions/:id', new auth_1.default().m, checkQuestionExist, unfollowQuestion);
router.get('/:id/questions', listQuestions); // 用户提出问题的列表
router.get('/:id/likingAnswers', listLikingAnswers);
router.put('/likingAnswers/:id', new auth_1.default().m, checkAnswerExist, likeAnswer, unDisLikeAnswer);
router.delete('/likingAnswers/:id', new auth_1.default().m, checkAnswerExist, unLikeAnswer);
router.get('/:id/dislikingAnswers', listDisLikingAnswers);
router.put('/dislikingAnswers/:id', new auth_1.default().m, checkAnswerExist, disLikeAnswer, unLikeAnswer);
router.delete('/dislikingAnswers/:id', new auth_1.default().m, checkAnswerExist, unDisLikeAnswer);
router.get('/:id/collectingAnswers', listCollectingAnswers);
router.put('/collectingAnswers/:id', new auth_1.default().m, checkAnswerExist, collectAnswer);
router.delete('/collectingAnswers/:id', new auth_1.default().m, checkAnswerExist, unCollectAnswer);
// 赞期刊
router.put('/likingPeriodical/:id', new auth_1.default().m, checkPeriodicalExist, likePeriodical);
// 取消赞期刊
router.delete('/likingPeriodical/:id', new auth_1.default().m, checkPeriodicalExist, unLikePeriodical);
// 是否赞过该期刊
router.get('/whetherLikingPeriodical/:id', new auth_1.default().m, checkPeriodicalExist, whetherLikePeriodical);
exports.default = router;
//# sourceMappingURL=users.js.map