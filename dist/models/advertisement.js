"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const advertisementSchema = new Schema({
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
        required: true,
        max: 120,
        min: 3 // 最小值验证
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return /http/.test(v);
            },
            message: 'link格式不正确!'
        }
    },
    description: {
        // 简介
        type: String
    },
    auditStatus: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.default = model('Advertisement', advertisementSchema);
//# sourceMappingURL=advertisement.js.map