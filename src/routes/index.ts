import glob from 'glob'; // 获取匹配规则的所有文件
import path from 'path';

const route = (app: any) => {
  try {
    glob.sync(path.resolve(__dirname, './**/!(index).js')).forEach((file: string) => {
      const router = require(file);
      app.use(router.default.routes());
      app.use(router.default.allowedMethods());
    });
  } catch (err) {
    console.log(err);
  }
};

export default route;