"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const topics_1 = __importDefault(require("../controllers/topics"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = new koa_router_1.default({ prefix: '/api/topics' });
const { find, findById, create, update, listTopicFollowers, checkTopicExist, listQuestions, listPeriodicals, informationStatistics } = topics_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkTopicExist, findById);
router.patch('/:id', new auth_1.default().m, checkTopicExist, update);
router.get('/:id/followers', checkTopicExist, listTopicFollowers);
router.get('/:id/questions', checkTopicExist, listQuestions);
router.get('/:id/periodicals', checkTopicExist, listPeriodicals);
router.get('/:id/information/statistics', new auth_1.default().m, checkTopicExist, informationStatistics);
exports.default = router;
//# sourceMappingURL=topics.js.map