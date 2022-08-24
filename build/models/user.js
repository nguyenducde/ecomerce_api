"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter name."],
    },
    phone: String,
    avatar: String,
    address: String,
    email: {
        type: String,
        unique: true,
        index: true,
        required: [true, "Email is required."],
        validate: [validator_1.default.isEmail, "Please enter valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "Please enter at least 6 characters"],
        select: false,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    facebookID: {
        type: String,
        select: false,
    },
    googleID: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "inactive", "pending", "banned"],
    },
    socialLogin: {
        type: Boolean,
        default: false,
    },
    lastLoggedIn: Date,
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map