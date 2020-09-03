"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const term_1 = __importDefault(require("../controllers/term"));
const router = new koa_router_1.default({ prefix: '/api/term' });
const { find, findById, create, update, checkTermExist, delete: del, } = term_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkTermExist, findById);
router.patch('/:id', new auth_1.default().m, checkTermExist, update);
router.delete('/:id', new auth_1.default().m, checkTermExist, del);
exports.default = router;
//# sourceMappingURL=term.js.map