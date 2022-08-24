"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config"));
const messages = {
    login: {
        noUserExists: "Account doesn't exists. Please register.",
        noUserPassword: "Error with your account.Please contact administrator.",
        notAdminRole: "User doesn't have enough permission.",
        invalidPassword: "Invalid Credential. Please Try again.",
        emailNotVerified: "Your account is not verified yet. A new verification email has been sent. Please verify.",
        success: "User logged in successfully.",
        error: "Error logging in user. Please try again",
    },
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, panel } = req.body;
        const user = yield user_1.default.findOne({ email: email, password: password });
        // Check User exists
        if (!user) {
            res.status(404).send({
                status: false,
                message: messages.login.noUserExists,
            });
        }
        // Check password exists
        if (!user.password) {
            return res.status(409).send({
                status: false,
                message: messages.login.noUserPassword,
            });
        }
        // check the roles
        if (panel && panel == "admin") {
            if (!user.role && user.role !== "admin") {
                return res.status(403).send({
                    status: false,
                    code: "UnauthorizedError",
                    message: messages.login.notAdminRole,
                });
            }
        }
        // checking password validation;
        const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({
                status: false,
                message: messages.login.invalidPassword,
            });
        }
        // generate token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwt.SECRET, {
            expiresIn: config_1.default.jwt.TOKEN_TTL,
            issuer: config_1.default.jwt.ISSUER,
        });
        // response user;
        const resUser = user.toObject();
        delete resUser.password;
        return res.status(200).send({
            status: true,
            message: messages.login.success,
            accessToken: token,
            user: resUser,
        });
    }
    catch (error) {
        return res.status(400).send({
            status: false,
            message: messages.login.error,
        });
    }
});
module.exports = { login };
//# sourceMappingURL=authController.js.map