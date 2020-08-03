"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const questionSchema = new Schema({
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
        required: true,
        select: false
    },
    topics: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topic'
            }
        ],
        select: false
    },
    pv: {
        type: Number,
        required: true,
        default: 0
    },
    popular: {
        type: Boolean,
        select: false,
        default: false
    },
    auditStatus: {
        type: Number,
        select: false,
        default: 0
    }
}, { timestamps: true });
exports.default = model('Question', questionSchema);
//# sourceMappingURL=questions.js.map