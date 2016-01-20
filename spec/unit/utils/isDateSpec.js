import isDate from 'www/js/utils/isDate';

describe('The isDate', () => {

    it('expected to return false if one of the parameters is empty', () => {
        expect(isDate('','format')).toBeFalsy();
        expect(isDate('date','')).toBeFalsy();
        expect(isDate(null,'')).toBeFalsy();
        expect(isDate()).toBeFalsy();
        expect(isDate(1,2)).toBeFalsy();
       
    });

    it('expected to return false if one of the parameters is not a string', () => {
        expect(isDate({'test':'test'},'format')).toBeFalsy();
        expect(isDate('date',{'test':'test'})).toBeFalsy();
    });

    it('expected date non supported date format to return false', () => {
        expect(() => { isDate('date', 'format'); }).toThrowError('isDate - format "format" is not supported!');
    });

    it('expected date format YYYY-MM-DD 2015-12-31 to be valid', () => {
        expect(isDate('2015-12-31','YYYY-MM-DD')).toBeTruthy();
    });

    it('expected date 900-12-35 to not be valid', () => {
        expect(isDate('900-12-35','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 3001-12-31 to not be valid', () => {
        expect(isDate('3001-12-31','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 2015-13-12 to not be valid', () => {
        expect(isDate('2015-13-12','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 2015-00-12 to not be valid', () => {
        expect(isDate('2015-00-12','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 2015-1-12 to not be valid', () => {
        expect(isDate('2015-1-12','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 2015-01-35 to not be valid', () => {
        expect(isDate('2015-01-35','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 2015-01-00 to not be valid', () => {
        expect(isDate('2015-01-00','YYYY-MM-DD')).toBeFalsy();
    });

    it('expected date 2015-01-1 to not be valid', () => {
        expect(isDate('2015-01-1','YYYY-MM-DD')).toBeFalsy();
    });
});
