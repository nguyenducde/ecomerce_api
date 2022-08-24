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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_2 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const user_1 = __importDefault(require("./user"));
const app = (0, express_1.default)();
app.use("/auth", auth_2.default);
app.use("/admin", auth_1.default.verifyToken, auth_1.default.hasRole(["admin"]), admin_1.default);
app.use("/user", auth_1.default.verifyToken, user_1.default);
// Logout
app.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToken = req.headers.authorization &&
            req.headers.authorization.split("Bearer ")[1];
        console.log("userToken", userToken);
        if (!userToken) {
            res.send({
                ok: true,
                message: "No user token. User already logged out.",
            });
            // throw "Token should be Bearer token";
            return;
        }
        return res.status(401).send({ status: true, message: "Logging user out." });
    }
    catch (error) {
        if (error.name == "TokenExpiredError" ||
            error.name === "JsonWebTokenError") {
            res.status(401).send({ ok: true, message: "Logging user out." });
            return;
        }
        console.error(error);
        res.status(400).send({
            ok: false,
            message: "Error Logging Out",
        });
    }
}));
exports.default = app;
//# sourceMappingURL=index.js.map