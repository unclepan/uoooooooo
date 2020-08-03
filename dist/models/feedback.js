"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const feedbackSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    content: {
        type: String,
        required: true,
        max: 360,
        min: 3 // 最小值验证
    },
    feedbacker: {
        // 反馈的人
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false
    },
}, { timestamps: true });
exports.default = model('Feedback', feedbackSchema);
//# sourceMappingURL=feedback.js.map