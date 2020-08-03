"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const answers_1 = __importDefault(require("../../controllers/answers"));
const router = new koa_router_1.default({ prefix: '/api/questions/:questionId/answers' });
const { find, findById, create, update, checkAnswerExist, checkAnswerer, delete: del, info, assInfo, } = answers_1.default;
router.get('/', find);
router.get('/detailed/info', new auth_1.default().m, info, assInfo);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkAnswerExist, findById);
router.patch('/:id', new auth_1.default().m, checkAnswerExist, checkAnswerer, update);
router.delete('/:id', new auth_1.default().m, checkAnswerExist, checkAnswerer, del);
exports.default = router;
//# sourceMappingURL=index.js.map