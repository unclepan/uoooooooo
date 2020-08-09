import _ from 'lodash';
import Koa from 'koa';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import error from 'koa-json-error';
import parameter from 'koa-parameter';
import mongoose from 'mongoose';
import path from 'path';

import routing from './routes/index';
import config from  './config';
const { connectionStr } = config;

const app = new Koa();
// 跨域
app.use(cors({
    origin: function(ctx) { // 设置允许来自指定域名请求
        if (ctx.url === '/test') {
            return '*'; // 允许来自所有域名请求
        }
        // return 'http://localhost:3000'; // 只允许域的请求
        return process.env.NODE_ENV === 'production' ? 'http://www.antcp.com' : 'http://localhost:3000';
    },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
  })
);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('数据库连接成功'));
mongoose.connection.on('error', console.error);

app.use(error({ // 错误处理
  postFormat: (e: any, obj: any) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
}));
app.use(koaBody({
  multipart: true, // 支持 multipart-formdate 的表单，意思就是支持文件上传(文件的Content-Type就叫multipart-formdate)
  formidable: { // koa-body集成了formidable包
  uploadDir: path.join(__dirname, '/public/uploads'),
  keepExtensions: true // 保留拓展名
  },
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb',
}));

// 参数校验
app.use(parameter(app));
routing(app);

export default app;