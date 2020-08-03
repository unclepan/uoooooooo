import Topic from '../models/topics';
import User from '../models/users';
import Question from '../models/questions';
import Answer from '../models/answers/answers';
import Periodical from '../models/periodical/periodical';

class TopicCtl {
  async find(ctx: any) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    const { auditStatus = 1, popular = false } = ctx.query;
    ctx.body = await Topic.find({
      name: q,
      auditStatus,
      popular
    })
      .limit(perPage)
      .skip(page * perPage);
  }
  async checkTopicExist(ctx: any, next: any) {
    const topic = await Topic.findById(ctx.params.id);
    if (!topic) {
      ctx.throw(404, '话题不存在');
    }
    await next();
  }
  async findById(ctx: any) {
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter((f: any) => f)
      .map((f: any) => '+' + f)
      .join(' ');
    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topic;
  }
  async create(ctx: any) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      pic: { type: 'string', required: true },
      introduction: { type: 'string', required: true }
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }
  async update(ctx: any) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      pic: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
      moreInformation: { type: 'array', required: false },
      popular: { type: 'boolean', required: false },
      auditStatus: { type: 'number', required: false }
    });
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!topic) {
      ctx.throw(404, '话题不存在');
    }
    ctx.body = topic; // topic是更新前的
  }
  async listTopicFollowers(ctx: any) {
    // 获取这个话题有那些关注者
    const users = await User.find({ followingTopics: ctx.params.id });
    ctx.body = users;
  }

  async listQuestions(ctx: any) {
    // 话题的问题列表
    const questions = await Question.find({ topics: ctx.params.id, auditStatus: 1 });
    ctx.body = await Promise.all(questions.map(async(item: any) => {
      return (async() => {
        const answerNum = await Answer.countDocuments({ questionId: item._id });
        return {
          id: item._id,
          title: item.title,
          pic: item.pic,
          description: item.description,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          answerNum
        };
      })();
    }));
  }

  async listPeriodicals(ctx: any) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    // 话题下有那些期刊
    const periodical = await Periodical.find({
      topics: ctx.params.id,
      auditStatus: 1
    })
      .limit(perPage)
      .skip(page * perPage);
    ctx.body = periodical;
  }

  async informationStatistics(ctx: any) {
    // 当前用户是否关注这个话题，这个话题的关注人数，话题下相关的问题数
    const me: any = await User.findById(ctx.state.user._id).select('+followingTopics');
    const index = me.followingTopics
      .map((id: any) => id.toString())
      .indexOf(ctx.params.id);
    let followingTopic = false;
    if (index > -1) {
      followingTopic = true;
    } else {
      followingTopic = false;
    }

    const followingTopicNum = await User.countDocuments({ followingTopics: ctx.params.id });
    const questionsNum = await Question.countDocuments({ topics: ctx.params.id, auditStatus: 1  });

    ctx.body = {followingTopic, followingTopicNum, questionsNum};
  }
}
export default new TopicCtl();
