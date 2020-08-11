import Privacy from '../models/privacy';

class CarouselCtl {
  async find(ctx: any) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Privacy.find()
      .limit(perPage)
      .skip(page * perPage);
  }
  async checkPrivacyExist(ctx: any, next: any) {
    const privacy = await Privacy.findById(ctx.params.id);
    if (!privacy) {
      ctx.throw(404, '当前隐私保护指引不存在');
    }
    ctx.state.privacy = privacy;
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
    const privacy = await Privacy.findById(ctx.params.id)
      .select(selectFields)
      .populate(populateStr);
    ctx.body = privacy;
  }
  async create(ctx: any) {
    ctx.verifyParams({
      content: { type: 'string', required: true }
    });
    const privacy = await new Privacy({
      ...ctx.request.body,
    }).save();
    ctx.body = privacy;
  }
  async update(ctx: any) {
    ctx.verifyParams({
      content: { type: 'string', required: false }
    });
    await ctx.state.privacy.update(ctx.request.body);
    ctx.body = ctx.state.privacy;
  }
  async delete(ctx: any) {
    await Privacy.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }

}
export default new CarouselCtl();
