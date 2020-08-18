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
        ]
    },
    voteCount: {
        type: Number,
        required: true,
        default: 0
    },
    popular: {
        type: Boolean,
        default: false
    },
    auditStatus: {
        type: Number,
        default: 0
    },
    del: {
        type: Boolean,
        select: false,
        default: false
    },
}, { timestamps: true });
exports.default = model('Periodical', periodicalSchema);
//# sourceMappingURL=index.js.map