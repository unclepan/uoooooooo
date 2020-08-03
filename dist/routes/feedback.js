"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const feedback_1 = __importDefault(require("../controllers/feedback"));
const router = new koa_router_1.default({ prefix: '/api/feedback' });
const { find, create, checkFeedbackExist, delete: del, } = feedback_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.delete('/:id', new auth_1.default().m, checkFeedbackExist, del);
exports.default = router;
//# sourceMappingURL=feedback.js.map