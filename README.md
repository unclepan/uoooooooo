# 博客后端

- 博客后端项目 基于 TypeScript + Koa2 改造
- 基本业务主要包含两大部分，专题与社区讨论（圈子）
- 用户中心
- 其他

## 专题
- 专题（periodical）：功能点包含专题文章，文章讨论，前端文章展示，后台主要包含文章编辑，新增，讨论的审核
- 专题推荐
- 专题最多查看

## 社区讨论（圈子）
- 类似一个问题论坛
- 话题（topics）：类似于标签，话题下有相应的期刊，有针对这个话题的 “问题”，“问题”下有回答
- 问题（questions）：某一个大话题的的各类问题
- 回答（answers）：针对某一个问题的回答，该回答下有别人的评论，有推荐给“话题模块”首页的优秀回答

## 用户中心
- 用户模块（users）：除了基本信息外，还有关注的人，关注的专题，关注的话题，关注的问题，赞过的答案，踩过的答案

## 其他
- 广告推荐（advertisement）
- 首页轮播（carousel）
- 收集的用户反馈（feedback）

## 代码注释
- jwt验证

```
const { secret } = require('../config');
1:
const auth = async(ctx, next) => { // 自己编写的认证
    const { authorization = '' } = ctx.request.header;
    const token = authorization.replace('Bearer ', '');
    try {
        const user = jsonwebtoken.verify(token, secret);
        ctx.state.user = user; // 通常放一些用户信息
    } catch (err) {
        ctx.throw(401, err.message); // 401 未认证
    }
    await next();
};

2:
const auth = jwt({ secret }); // 使用三方包的认证

```

- 动态模块，动态建表

```
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 系统预定义的表（动态建立的表不能与系统表冲突）
const common = require('../common/db');

class ModelInstance {
	constructor(){
		this.modelInstanceList = {};
	}
	init(m = {}, modelName,ctx){	
		// 如果已存在就要先删除
		if (this.modelInstanceList[modelName]) {
			if(common.dbModelName.indexOf(modelName) >= 0){
				ctx.throw(409, '系统预置数据库model，禁止delete操作');
			}
			// 关键：清理已生成的model
			delete mongoose.models[modelName];
			delete mongoose.modelSchemas[modelName];
			delete this.modelInstanceList[modelName];
		}
		let obj = Object.assign({
			__v: {
				type: Number,
				select: false
			},
			del: { // 软删除
				type: Boolean,
				required: true,
				default: false,
				select: false
			},
		}, m);
		const moduleSchema = new Schema(obj, { timestamps: true });
		this.modelInstanceList[modelName] = model(modelName, moduleSchema);
		return this.modelInstanceList[modelName];
	}
}

module.exports = new ModelInstance();
```

## 产品开发注意事项
- 逻辑表和业务表要严格分离
- 表与表之间的业务关联关系，使用中间表的方式

