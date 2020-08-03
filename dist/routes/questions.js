"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const questions_1 = __importDefault(require("../controllers/questions"));
const router = new koa_router_1.default({ prefix: '/api/questions' });
const { find, findById, create, update, checkQuestionExist, checkQuestioner, delete: del, informationStatistics } = questions_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkQuestionExist, findById);
router.patch('/:id', new auth_1.default().m, checkQuestionExist, checkQuestioner, update);
router.delete('/:id', new auth_1.default().m, checkQuestionExist, checkQuestioner, del);
router.get('/:id/information/statistics', new auth_1.default().m, checkQuestionExist, informationStatistics);
exports.default = router;
//# sourceMappingURL=questions.js.map