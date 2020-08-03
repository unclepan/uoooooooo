"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const carousel_1 = __importDefault(require("../controllers/carousel"));
const router = new koa_router_1.default({ prefix: '/api/carousel' });
const { find, findById, create, update, checkCarouselExist, delete: del, } = carousel_1.default;
router.get('/', find);
router.post('/', new auth_1.default().m, create);
router.get('/:id', checkCarouselExist, findById);
router.patch('/:id', new auth_1.default().m, checkCarouselExist, update);
router.delete('/:id', new auth_1.default().m, checkCarouselExist, del);
exports.default = router;
//# sourceMappingURL=carousel.js.map