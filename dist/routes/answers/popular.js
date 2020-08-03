"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const answers_1 = __importDefault(require("../../controllers/answers/answers"));
const router = new koa_router_1.default({ prefix: '/api/answers/popular' });
const { popular, assInfo } = answers_1.default;
router.get('/', new auth_1.default().m, popular, assInfo);
exports.default = router;
//# sourceMappingURL=popular.js.map