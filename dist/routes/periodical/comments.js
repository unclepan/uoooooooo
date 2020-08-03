"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const comments_1 = __importDefault(require("../../controllers/periodical/comments"));
const router = new koa_router_1.default({ prefix: '/api/periodical/:periodicalId/comments' });
const { find, findById, create, update, checkCommentExist, checkCommentator, delete: del } = comments_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkCommentExist, findById);
router.patch('/:id', new auth_1.default().m, checkCommentExist, checkCommentator, update);
router.delete('/:id', new auth_1.default().m, checkCommentExist, checkCommentator, del);
exports.default = router;
//# sourceMappingURL=comments.js.map