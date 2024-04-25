"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
var dotenv_1 = require("dotenv");
var fs_1 = require("fs");
var path_1 = require("path");
dotenv_1.default.config();
var logPath = (_a = process.env.LOGS) !== null && _a !== void 0 ? _a : '';
console.log(logPath);
if (logPath !== undefined && !fs_1.default.existsSync(logPath))
    fs_1.default.mkdirSync(logPath);
exports.logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.timestamp()),
    transports: [new winston_1.default.transports.File({
            filename: path_1.default.join(logPath, 'errors.log'),
            level: 'error'
        }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logPath, 'debug.log') })]
});
if (process.env.ENVIROMENT !== 'PRODUCTION') {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.colorize({ all: true }), winston_1.default.format.timestamp())
    }));
}
