"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const periodical_1 = __importDefault(require("../../controllers/periodical"));
const router = new koa_router_1.default({ prefix: '/api/periodical' });
const { find, findById, create, update, checkPeriodicalExist, delete: del, import: im } = periodical_1.default;
router.get('/', new auth_1.default().m, find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkPeriodicalExist, findById);
router.patch('/:id', new auth_1.default().m, checkPeriodicalExist, update);
router.delete('/:id', new auth_1.default().m, checkPeriodicalExist, del);
router.post('/import', new auth_1.default().m, im);
exports.default = router;
//# sourceMappingURL=index.js.map