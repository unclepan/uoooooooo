"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const bp_1 = __importDefault(require("../controllers/bp"));
const router = new koa_router_1.default({
    prefix: '/api/bp'
});
const { create, find } = bp_1.default;
router.post('/', create);
router.get('/', find);
exports.default = router;
//# sourceMappingURL=bp.js.map