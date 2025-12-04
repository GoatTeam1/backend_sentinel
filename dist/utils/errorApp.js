"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorApp = void 0;
class errorApp extends Error {
    constructor(message, status, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}
exports.errorApp = errorApp;
