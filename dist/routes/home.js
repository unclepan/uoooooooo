"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const home_1 = __importDefault(require("../controllers/home"));
const router = new koa_router_1.default({
    prefix: '/api'
});
const { index, upload } = home_1.default;
router.get('/', index);
router.post('/upload', upload);
exports.default = router;
//# sourceMappingURL=home.js.map