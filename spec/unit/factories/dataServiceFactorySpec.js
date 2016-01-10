import DataServiceFactory from 'www/js/factories/dataServiceFactory';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The DataServiceFactory', () => {

    let factory;

    beforeEach(() => {
        factory = new DataServiceFactory(new Log(), CONFIG);
    });

    it('expected the factory to not be null', () => {
        expect(factory).not.toBeNull();
    });

    it('expected the getDataService to not be null', () => {
        var ds = factory.getDataService("Team 1");
        expect(ds).not.toBeNull();
    });


});
