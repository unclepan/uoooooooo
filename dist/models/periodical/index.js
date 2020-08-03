"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const periodicalSchema = new Schema({
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
        index: true,
        required: true,
        max: 120,
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
    describe: {
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
        ],
        select: false
    },
    voteCount: {
        // 投票数
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
exports.default = model('Periodical', periodicalSchema);
//# sourceMappingURL=index.js.map