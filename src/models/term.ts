import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const termSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default  model('Term', termSchema);
