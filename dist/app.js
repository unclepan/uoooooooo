"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const koa_1 = __importDefault(require("koa"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_json_error_1 = __importDefault(require("koa-json-error"));
const koa_parameter_1 = __importDefault(require("koa-parameter"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const config_1 = __importDefault(require("./config"));
const { connectionStr } = config_1.default;
const app = new koa_1.default();
// 跨域
app.use(koa2_cors_1.default({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return '*'; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; // 只允许域的请求
        // return 'http://www.antcp.com';
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}));
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('数据库连接成功'));
mongoose_1.default.connection.on('error', console.error);
app.use(koa_json_error_1.default({
    postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? lodash_1.default.omit(obj, 'stack') : obj
}));
app.use(koa_body_1.default({
    multipart: true,
    formidable: {
        uploadDir: path_1.default.join(__dirname, '/public/uploads'),
        keepExtensions: true // 保留拓展名
    },
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb',
}));
// 参数校验
app.use(koa_parameter_1.default(app));
index_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map