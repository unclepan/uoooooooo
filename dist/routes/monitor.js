"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const monitor_1 = __importDefault(require("../models/monitor"));
const router = new koa_router_1.default({ prefix: '/api/monitor' });
const { find, create } = monitor_1.default;
router.get('/', find);
router.post('/', create);
exports.default = router;
//# sourceMappingURL=monitor.js.map