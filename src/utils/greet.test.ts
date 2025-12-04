import { greet } from './greet';

describe('greet', () => {
    test('greets a provided name', () => {
        expect(greet('TypeScript')).toBe('Hello, TypeScript!');
    });

    test('defaults to world when no name provided', () => {
        expect(greet()).toBe('Hello, world!');
    });
});
