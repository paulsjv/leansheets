import GoogleDataTransform from 'www/js/etl/google/googleDataTransform';
import Log from 'spec/mocks/log';

describe('The GoogleDataTransform', () => {

    var transform;
    var log = new Log();

    beforeEach(() => {
        let queryConfig = {};
        transform = new GoogleDataTransform(log, queryConfig); 
    });

    it('expected transform object to not be null', () => {
        expect(transform).not.toBeNull();
    });

});

