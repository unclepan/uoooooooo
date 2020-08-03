"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const topicSchema = new Schema({
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
        required: true,
        select: false
    },
    moreInformation: {
        type: Array,
        select: false
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
exports.default = model('Topic', topicSchema);
//# sourceMappingURL=topics.js.map