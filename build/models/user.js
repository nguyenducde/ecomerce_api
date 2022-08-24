"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const CartItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    priceAfterDiscount: Number,
});
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
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    cart: [CartItemSchema],
    order: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Order"
        }],
    shipping_address: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "ShippingAddress"
        }],
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
exports.Cart = (0, mongoose_1.model)("CartItem", CartItemSchema);
exports.default = User;
//# sourceMappingURL=user.js.map