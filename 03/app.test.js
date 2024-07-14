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
    test('throw error if min > max', () => {
        expect(() => randomNumber(4, 3)).toThrow(RangeError);
    })
    test('returns a number within the range', () => {
        const min = 2
        const max = 5
        const result = randomNumber(min, max)
        expect(result).toBeGreaterThanOrEqual(min)
        expect(result).toBeLessThanOrEqual(max)
    });
})
