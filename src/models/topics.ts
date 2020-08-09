import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const topicSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    pic: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    introduction: {
      // 简介
      type: String,
      required: true
    },
    moreInformation: {
      type: Array
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

export default model('Topic', topicSchema);
