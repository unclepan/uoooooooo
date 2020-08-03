"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob")); // 获取匹配规则的所有文件
const path_1 = __importDefault(require("path"));
const route = (app) => {
    try {
        glob_1.default.sync(path_1.default.resolve(__dirname, './**/!(index).js')).forEach((file) => {
            const router = require(file);
            app.use(router.default.routes());
            app.use(router.default.allowedMethods());
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = route;
//# sourceMappingURL=index.js.map