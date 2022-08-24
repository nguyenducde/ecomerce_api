"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config = {
    app: {
        NAME: process.env.APP_NAME || 'api',
        ENV: process.env.NODE_ENV || 'dev',
        PORT: process.env.PORT || 5000,
        API_URL: process.env.API_URL || 'http://localhost:5000',
        MONGO_URI: process.env.MONGO_URI || "mongodb+srv://root:admin123@dbmongo.qcmmrxv.mongodb.net/?retryWrites=true&w=majority",
        FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
        BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:4000'
    },
    jwt: {
        SECRET: process.env.JWT_SECRET || "lfakjfslfkaslkdfjlksjfsfdskfjls",
        ISSUER: process.env.JWT_ISSUER || 'kosheli',
        TOKEN_TTL: process.env.JWT_TOKEN_TTL || "1d",
    },
    mail: {
        api_key: process.env.SENDER_API_KEY || "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"
    }
};
exports.default = config;
//# sourceMappingURL=index.js.map