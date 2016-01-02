import BuildLocalStorageService from 'www/js/services/buildLocalStorageService';
import Log from 'spec/mocks/log';

describe('The buildLocalStorageService', () => {

    let service;

    beforeEach(() => {
		service = new BuildLocalStorageService(new Log());
    });

    it('expected to be ture', () => {
		expect(service.buildLocalStorage()).toBe(true);
    });

});
