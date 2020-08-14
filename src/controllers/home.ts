import path from 'path';
import BP from '../models/bp';
import moment from 'moment';

class HomeCtl {
  index(ctx: { body: string; }) {
    ctx.body = '接口';
  }
  upload(ctx: any) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = {
      url: `${ctx.origin}/uploads/${basename}`
    };
  }
}

export default new HomeCtl();
