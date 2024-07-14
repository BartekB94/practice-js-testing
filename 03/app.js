export default function randomNumber(min, max) {
    if(typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Given parameter is not a number')
    }
    if(min > max) {
        throw new RangeError('min have to be lower number than max')
    }
    return Math.random() * (max - min) + min;
}