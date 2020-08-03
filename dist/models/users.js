"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_WORK_FACTOR = 10;
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(v);
            },
            message: '邮箱格式不正确!'
        }
    },
    password: {
        type: String,
        required: true,
        select: false // mongoose的一个语法，获取的时候不显示
    },
    avatar_url: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
        required: true
    },
    introduce: {
        type: String,
        default: '暂无简介',
    },
    locations: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topic'
            }
        ],
        select: false
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        select: false
    },
    employments: {
        type: [
            {
                company: {
                    type: Schema.Types.ObjectId,
                    ref: 'Topic'
                },
                job: {
                    type: Schema.Types.ObjectId,
                    ref: 'Topic'
                }
            }
        ],
        select: false
    },
    educations: {
        type: [
            {
                school: {
                    type: Schema.Types.ObjectId,
                    ref: 'Topic'
                },
                major: {
                    type: Schema.Types.ObjectId,
                    ref: 'Topic'
                },
                diploma: {
                    type: Number,
                    enum: [1, 2, 3, 4, 5]
                },
                entrance_year: {
                    type: Number
                },
                graduation_year: {
                    type: Number
                }
            }
        ],
        select: false
    },
    following: {
        // 关注者列表，关注了那些人
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        select: false // 隐藏，查询的时候不显示
    },
    followingTopics: {
        // 话题列表，关注了那些话题
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topic'
            }
        ],
        select: false
    },
    followingQuestions: {
        // 问题列表，关注了那些问题
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question'
            }
        ],
        select: false
    },
    likingAnswers: {
        // 赞过的答案
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Answer'
            }
        ],
        select: false
    },
    dislikingAnswers: {
        // 踩过的答案
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Answer'
            }
        ],
        select: false
    },
    collectingAnswers: {
        // 收藏的答案
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Answer'
            }
        ],
        select: false
    },
    likingPeriodicals: {
        // 赞过的期刊
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Periodical'
            }
        ],
        select: false
    },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    // 保存之前中间件
    const user = this;
    // 加盐加密，是否更改，mongoose上的方法
    if (!user.isModified('password'))
        return next();
    bcrypt_1.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(_password, password, (err, isMatch) => {
                if (!err)
                    resolve(isMatch);
                else
                    reject(err);
            });
        });
    }
};
exports.default = model('User', userSchema);
//# sourceMappingURL=users.js.map