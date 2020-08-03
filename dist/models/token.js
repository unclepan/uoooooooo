"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const tokenSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    token: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.default = model('Token', tokenSchema);
//# sourceMappingURL=token.js.map