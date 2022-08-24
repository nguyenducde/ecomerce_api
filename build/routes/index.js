"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./v1"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "..", "uploads")));
app.use("/v1", v1_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map