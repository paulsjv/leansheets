import isString from 'www/js/utils/isString';

describe('The isString', () => {

    it('expected to return false', () => {
        expect(isString(null)).toBeFalsy();
        expect(isString(0)).toBeFalsy();
    });

    it('expected to return true', () => {
        expect(isString('string')).toBeTruthy();
    });
});
