import DataService from 'www/js/services/dataService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The DataService', () => {

    let service;

    beforeEach(() => {
        service = new DataService(new Log(), CONFIG);
    });

    it('expected the service to not be null', () => {
        expect(service).not.toBeNull();
    });

    it('expected getData to not be null', () => {
        expect(service.getData()).not.toBeNull();
    });


});
