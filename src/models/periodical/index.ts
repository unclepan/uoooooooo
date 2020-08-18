import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const periodicalSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    pic: {
      type: String,
      required: true
    },
    title: {
      type: String,
      index: true, // 辅助索引
      required: true, // 验证必填
      max: 120, // 最大值验证
      min: 3 // 最小值验证
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    describe: { // 描述
      type: String,
      required: true
    },
    pv: {
      type: Number,
      required: true,
      default: 0
    },
    topics: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        }
      ]
    },
    voteCount: { // 收藏数
      type: Number,
      required: true,
      default: 0
    },
    popular: { // 是否要推荐展示
      type: Boolean,
      default: false
    },
    auditStatus: { // 审核状态
      type: Number,
      default: 0
    },
    del: { // 软删除
      type: Boolean,
      select: false,
      default: false
    },
  },
  { timestamps: true }
);

export default model('Periodical', periodicalSchema);
