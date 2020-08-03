"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const bpSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    bp: {
        type: Object,
        required: true
    },
}, { timestamps: true });
exports.default = model('BP', bpSchema);
//# sourceMappingURL=bp.js.map