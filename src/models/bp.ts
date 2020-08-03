import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bpSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    bp: {
      type: Object,
      required: true
    },
  },
  { timestamps: true }
);

export default model('BP', bpSchema);
