import isEmpty from 'www/js/utils/isEmpty';
 
describe('The isEmpty', () => {

    it('expected to be empty', () => {
        expect(isEmpty(null)).toBeTruthy();
    });

    it('expected to not be empty', () => {
        expect(isEmpty('not empty')).toBeFalsy();
    });

    it('expected integers to be empty', () => {
        expect(isEmpty(1)).toBeTruthy();
    });
});
