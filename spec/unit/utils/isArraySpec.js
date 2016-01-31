import isArray from 'www/js/utils/isArray';
 
describe('The isArray', () => {

    it('expected to be an array', () => {
        expect(isArray([1, 2, 3])).toBeTruthy();
    });

    it('expected to not be an array', () => {
        expect(isArray('not empty')).toBeFalsy();
    });
});
