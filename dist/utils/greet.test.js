"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greet_1 = require("./greet");
describe('greet', () => {
    test('greets a provided name', () => {
        expect((0, greet_1.greet)('TypeScript')).toBe('Hello, TypeScript!');
    });
    test('defaults to world when no name provided', () => {
        expect((0, greet_1.greet)()).toBe('Hello, world!');
    });
});
