import randomNumber from './app';

describe('randomNumber', () => {
    test('return 1 when min=1 and max=1', () => {
        expect(randomNumber(1, 1)).toBe(1)
    })
    test('throw error if min/max is not a number', () => {
        expect(() => randomNumber('hello', 1)).toThrow(TypeError);
        expect(() => randomNumber(1, 'hello')).toThrow(TypeError);
        expect(() => randomNumber('hello', 'hello')).toThrow(TypeError);
    });
})
