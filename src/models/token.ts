import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    token: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default model('Token', tokenSchema);
