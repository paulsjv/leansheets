import hasOwnProp from 'www/js/utils/hasOwnProp';

describe('The hasOwnProp', () => {

    it('expected to not have the property', () => {
        let obj = {};
        expect(hasOwnProp(obj, 'prop')).toBeFalsy();
    });

    it('expected to have the property', () => {
        let obj = { 'exsist': 'value' };
        expect(hasOwnProp(obj, 'exsist')).toBeTruthy();
    });
});
