import { _find, _findIndex } from 'www/js/utils/find';
import { LARGE_GDATA as GDATA } from 'spec/mocks/gdata';

describe('The Find', () => {
    it('expected to find column A object in the array of columns', () => {
        expect(_find(GDATA.cols, ['id','A'])).toEqual({"id": "A","label": "Id","type": "number","pattern": "General"});
    });

    it('expected to find the index of column A in the array of columns', () => {
        expect(_findIndex(GDATA.cols, ['id','A'])).toEqual(0);
    });
});
