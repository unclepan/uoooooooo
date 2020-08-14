import Term from '../models/term';

class CarouselCtl {
  async find(ctx: any) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Term.find()
      .limit(perPage)
      .skip(page * perPage);
  }
  async checkTermExist(ctx: any, next: any) {
    const term = await Term.findById(ctx.params.id);
    if (!term) {
      ctx.throw(404, '当前协议不存在');
    }
    ctx.state.term = term;
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
    const term = await Term.findById(ctx.params.id)
      .select(selectFields)
      .populate(populateStr);
    ctx.body = term;
  }
  async create(ctx: any) {
    ctx.verifyParams({
      content: { type: 'string', required: true }
    });
    const term = await new Term({
      ...ctx.request.body,
    }).save();
    ctx.body = term;
  }
  async update(ctx: any) {
    ctx.verifyParams({
      content: { type: 'string', required: false }
    });
    await ctx.state.term.update(ctx.request.body);
    ctx.body = ctx.state.term;
  }
  async delete(ctx: any) {
    await Term.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}
export default new CarouselCtl();
