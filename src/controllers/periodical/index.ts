import Periodical from '../../models/periodical';

class PeriodicalCtl {
  async find(ctx: any) {
    const { size = 10, current = 1, query } = ctx.query;
    let page = Math.max(current * 1, 1) - 1;
    const pageSize = Math.max(size * 1, 1);
    const q = new RegExp(query);
    const other = { ...ctx.query };
    delete other.size;
    delete other.current;
    delete other.query;
    const conditions = { title: q, ...other };
    const count = await Periodical.countDocuments(conditions);
    if (count < page * pageSize) {
      page = 0;
    }
    const data = await Periodical.find(conditions)
      .limit(pageSize)
      .skip(page * pageSize)
      .sort({'updatedAt': -1});
    ctx.body = {
      data,
      count,
      current: page + 1,
      size: pageSize
    };
  }
  async checkPeriodicalExist(ctx: any, next: any) {
    const periodical = await Periodical.findById(ctx.params.id);
    if (!periodical) {
      ctx.throw(404, '期刊不存在');
    }
    ctx.state.periodical = periodical;
    await next();
  }
  async findById(ctx: any) {
    // pv统计
    await Periodical.findByIdAndUpdate(ctx.params.id, { $inc: { pv: 1 } });

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
    const periodical = await Periodical.findById(ctx.params.id)
      .select(selectFields)
      .populate(populateStr);
    ctx.body = periodical;
  }
  async create(ctx: any) {
    ctx.verifyParams({
      pic: { type: 'string', required: true },
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      author: { type: 'string', required: true },
      describe: { type: 'string', required: true }
    });
    const periodical = await new Periodical({
      ...ctx.request.body,
    }).save();
    ctx.body = periodical;
  }
  async update(ctx: any) {
    ctx.verifyParams({
      pic: { type: 'string', required: false },
      title: { type: 'string', required: false },
      content: { type: 'string', required: false },
      author: { type: 'string', required: false },
      describe: { type: 'string', required: false },
      topics: { type: 'array', required: false },
      popular: { type: 'boolean', required: false },
      auditStatus: { type: 'number', required: false }
    });
    await ctx.state.periodical.update(ctx.request.body);
    ctx.body = ctx.state.periodical;
  }

  async delete(ctx: any) {
    await Periodical.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}
export default new PeriodicalCtl();
