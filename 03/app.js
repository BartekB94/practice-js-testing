export default function randomNumber(min, max) {
    if(typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Given parameter is not a number')
    }
    return Math.random() * (max - min) + min;
}