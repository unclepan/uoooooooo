import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    pic: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    description: {
      // 简介
      type: String
    },
    questioner: {
      // 提问者
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    topics: { // 属于那些话题
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        }
      ]
    },
    pv: {
      type: Number,
      required: true,
      default: 0
    },
    popular: { // 是否要推荐展示
      type: Boolean,
      select: false,
      default: false
    },
    auditStatus: { // 审核状态
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default model('Question', questionSchema);
