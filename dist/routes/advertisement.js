"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const advertisement_1 = __importDefault(require("../controllers/advertisement"));
const router = new koa_router_1.default({ prefix: '/api/advertisement' });
const { find, findById, create, update, checkAdvertisementExist, delete: del, } = advertisement_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkAdvertisementExist, findById);
router.patch('/:id', new auth_1.default().m, checkAdvertisementExist, update);
router.delete('/:id', new auth_1.default().m, checkAdvertisementExist, del);
exports.default = router;
//# sourceMappingURL=advertisement.js.map