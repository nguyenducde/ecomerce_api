"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const MONGO_URI = config_1.default.app.MONGO_URI;
mongoose_1.default.set("debug", config_1.default.app.ENV === "dev");
mongoose_1.default
    .connect(MONGO_URI)
    .catch((error) => console.error(error));
const db = mongoose_1.default.connection;
exports.default = db;
//# sourceMappingURL=index.js.map