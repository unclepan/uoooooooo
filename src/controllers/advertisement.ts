import Advertisement from '../models/advertisement';

class AdvertisementCtl {
  async find(ctx: any) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    const { auditStatus = 1 } = ctx.query; // 审核状态
    ctx.body = await Advertisement.find({
      title: q,
      auditStatus
    })
      .limit(perPage)
      .skip(page * perPage);
  }
  async checkAdvertisementExist(ctx: any, next: any) {
    const advertisement = await Advertisement.findById(ctx.params.id);
    if (!advertisement) {
      ctx.throw(404, '当前广告不存在');
    }
    ctx.state.advertisement = advertisement;
    await next();
  }
  async findById(ctx: any) {
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter((f: any) => f)
      .map((f: any) => '+' + f)
      .join(' ');
    const populateStr = fields
      .split(';')
      .filter((f: any) => f)
      .map((f: any) => f)
      .join(' ');
    const advertisement = await Advertisement.findById(ctx.params.id)
      .select(selectFields)
      .populate(populateStr);
    ctx.body = advertisement;
  }
  async create(ctx: any) {
    ctx.verifyParams({
      pic: { type: 'string', required: true },
      title: { type: 'string', required: true },
      link: { type: 'string', required: true },
    });
    const advertisement = await new Advertisement({
      ...ctx.request.body,
    }).save();
    ctx.body = advertisement;
  }
  async update(ctx: any) {
    ctx.verifyParams({
      pic: { type: 'string', required: false },
      title: { type: 'string', required: false },
      link: { type: 'string', required: false },
    });
    await ctx.state.advertisement.update(ctx.request.body);
    ctx.body = ctx.state.advertisement;
  }
  async delete(ctx: any) {
    await Advertisement.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }

}
export default new AdvertisementCtl();
