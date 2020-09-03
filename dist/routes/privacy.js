"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const privacy_1 = __importDefault(require("../controllers/privacy"));
const router = new koa_router_1.default({ prefix: '/api/privacy' });
const { find, findById, create, update, checkPrivacyExist, delete: del, } = privacy_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkPrivacyExist, findById);
router.patch('/:id', new auth_1.default().m, checkPrivacyExist, update);
router.delete('/:id', new auth_1.default().m, checkPrivacyExist, del);
exports.default = router;
//# sourceMappingURL=privacy.js.map