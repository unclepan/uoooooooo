import BP from '../models/bp';
import moment from 'moment';
import utils from '../common/utils';

class BpCtl {
  async create(ctx: any) {
    const { data } = ctx.request.body;
    const unzipData = process.env.NODE_ENV === 'production' ? utils.unzip(data) : data;
    const v = JSON.parse(unzipData);
    for (let i = 0; i < v.length; i++) {
      new BP({
        bp: {...v[i], tFom: moment(v[i].t).format('YYYY/MM/DD HH:mm:ss')},
      }).save();
    }
    ctx.body = { mas: '埋点测试' };
  }
  async find(ctx: any) {
    ctx.body = await BP.find();
  }
}

export default new BpCtl();
