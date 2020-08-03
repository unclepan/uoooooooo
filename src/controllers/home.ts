import path from 'path';
import BP from '../models/bp';
import moment from 'moment';

class HomeCtl {
  index(ctx: { body: string; }) {
    ctx.body = '接口';
  }
  async bpCreate(ctx: any) {
    const {data} = ctx.request.body;
    const v = JSON.parse(data);

    for (let i = 0; i < v.length; i++) {
      new BP({
        bp: {...v[i], tFom: moment(v[i].t).format('YYYY/MM/DD HH:mm:ss')},
      }).save();
    }
    ctx.body = { mas: '埋点测试' };
  }
  async bpFind(ctx: any) {
    ctx.body = await BP.find();
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
