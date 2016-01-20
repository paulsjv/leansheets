import GoogleQueryBuilder from 'www/js/etl/google/googleQueryBuilder';
import ConfigService from 'www/js/services/configService';
import Log from 'spec/mocks/log';
import { CONFIG } from 'spec/mocks/config';

describe('The GoogleQueryBuilder', () => {

    let builder;
    let configService;
    let log = new Log();
    let queryConfig; 

    beforeEach(() => {
        configService = new ConfigService(log, CONFIG);
        queryConfig = configService.getDataSource('Team 1').queryConfig;
        builder = new GoogleQueryBuilder(log, queryConfig);        
    });

    it('expected getQuery to return a string of query', () => {
        let startDate = '2014-11-01',
            endDate = '2015-05-01',
            query = builder.getQuery(startDate, endDate);
        expect(query).toEqual("SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O WHERE D is not null AND toDate(D) >= toDate(date '"+ startDate +"') AND toDate(D) <= toDate(date '"+ endDate +"') order by D asc");
    });

    it('expected getQuery to not have a property in the query config and throw an error', () => {
        let startDate = '2014-11-01',
            endDate = '2015-05-01',
            qConfig = { 'not a prop': 'fake' },
            builder = new GoogleQueryBuilder(log, qConfig);

        expect(() => { builder.getQuery(startDate, endDate); })
                    .toThrowError(Error, 'GoogleQueryBuilderHelper - Query Config does not have property: states');
    });

    it('expected getQuery to have an empty property in the query config and throw an error', () => {
        let startDate = '2014-11-01',
            endDate = '2015-05-01',
            qConfig = { 'states': '' },
            builder = new GoogleQueryBuilder(log, qConfig);

        expect(() => { builder.getQuery(startDate, endDate); })
                    .toThrowError(Error, 'GoogleQueryBuilderHelper - Query Config property "states" is empty!');
    });

    it('expected getQuery to have an array property in the query config that is not a string and throw an error', () => {
        let startDate = '2014-11-01',
            endDate = '2015-05-01',
            qConfig = { 'states': [ 'string', 0 ]},
            builder = new GoogleQueryBuilder(log, qConfig);

        expect(() => { builder.getQuery(startDate, endDate); })
                    .toThrowError(Error, 'GoogleQueryBuilderHelper - Query Config only supports strings in arrays');
    });


 });
