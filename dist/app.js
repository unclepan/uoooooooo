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
const koa_logger_1 = __importDefault(require("koa-logger"));
// import koaStatic from 'koa-static';
const index_1 = __importDefault(require("./routes/index"));
const config_1 = __importDefault(require("./config"));
const { connectionStr } = config_1.default;
const app = new koa_1.default();
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('数据库连接成功'));
mongoose_1.default.connection.on('error', console.error);
// 跨域
app.use(koa2_cors_1.default({
    origin: function (ctx) {
        const host = ctx.header.host;
        if (ctx.url === '/test') {
            return '*'; // 允许来自所有域名请求
        }
        if (process.env.NODE_ENV === 'production') {
            const whiteList = ['http://uoooooooo.com', 'http://www.uoooooooo.com']; // 可跨域白名单
            let url = host && host.substr(0, host.length - 1);
            if (!whiteList.includes(url)) {
                url = 'http://uoooooooo.com';
            }
            return url;
        }
        else {
            const whiteList = ['http://localhost:3002', 'http://localhost:9528']; // 可跨域白名单
            let url = host && host.substr(0, host.length - 1);
            if (!whiteList.includes(url)) {
                url = 'http://localhost:9528';
            }
            return url;
        }
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}));
// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 输出请求日志的功能
app.use(koa_logger_1.default());
// 静态文件服务
// app.use(koaStatic(__dirname + '/public'));
// app.use(koaStatic(__dirname + '/uploads'));
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
// 路由
index_1.default(app);
// 错误捕获
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
exports.default = app;
//# sourceMappingURL=app.js.map