"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../../../controllers/authController"));
const authValidator_1 = __importDefault(require("../../../middlewares/validator/authValidator"));
const index_1 = require("../../../middlewares/index");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/login", authValidator_1.default.loginValidator, index_1.validate, authController_1.default.login);
router.get("/profile", auth_1.default.verifyToken, authController_1.default.profile);
router.patch("/profile/:id", authController_1.default.profileUpdate);
router.post("/change-password", authController_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=index.js.map