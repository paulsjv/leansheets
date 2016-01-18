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

    it('expected the GoogleQueryBuilder to not be null', () => {
        expect(builder).not.toBeNull();
    });
/*
    it('expected the hasProperty to return false when undefined is passed as a param', () => {
        expect(builder.hasProperty(undefined)).toBeFalsy();
    });

    it('expected the hasProperty to return false when null is passed as a param', () => {
        expect(builder.hasProperty(null)).toBeFalsy();
    });

    it('expected the hasProperty to return false when string is passed as param', () => {
        expect(builder.hasProperty('does not exsist')).toBeFalsy();
    });

    it('expected the hasProperty to return ture when correct string is passed as param', () => {
        let qConfig = { 'id': 'value' };
        builder = new GoogleQueryBuilder(log, qConfig);
        expect(builder.hasProperty('id')).toBeTruthy();
    });

    it('expected the getQueryConfigProperty to return when property does not exsist', () => {
        expect(builder.getQueryConfigProperty('does not exsist')).toBeNull();
    }); 

    it('expected the getQueryConfigProperty to return null when property is empty', () => {
        let qConfig = {
            'empty': ''
        };
        builder = new GoogleQueryBuilder(log, qConfig);
        expect(builder.getQueryConfigProperty('empty')).toBeNull();
    });

    it('expected the getQueryConfigProperty to return string when property exsist', () => {
        let qConfig = { 'exsist': 'value' };
        builder = new GoogleQueryBuilder(log, qConfig);
        expect(builder.getQueryConfigProperty('exsist')).toEqual('value');
    });

    it('expected the buildSelectFields to return string', () => {
        expect(builder.buildSelectFields()).toEqual('A,B,C,D,E,F,G,H,I,J,K,L,M,N,O');
    });

    it('expected the arrayToFields to throw error', () => {
        expect(() => { builder.arrayToFields('throw error'); }).toThrowError('googleQueryBuilder.js - array was not passed to method');
    }); 

    it('expected the arrayToFields to throw error if array not all strings', () => {
        let array = [ 0, '1' ];
        expect(() => { builder.arrayToFields(array); }).toThrowError('googleQueryBuilder.js - queryConfig only supports strings in arrays');
    });

    it('expected the buildSelectClause to return comma seperated string', () => {
        let qConfig = {
            'id': 'A',
            'description': 'B',
            'states': ['D','E','F','G']
        };
        builder = new GoogleQueryBuilder(log, qConfig);
        expect(builder.buildSelectClause()).toEqual('SELECT A,B,D,E,F,G');
   });

    it('expected the buildWhereClause to return a string', () => {
        let qConfig = {
            'states': ['D','E']
        };
        builder = new GoogleQueryBuilder(log, qConfig);
        expect(builder.buildWhereClause('2015-12-31','2016-01-31')).toEqual("WHERE D is not null AND toDate(D) >= toDate(date '2015-12-31') AND toDate(D) <= toDate(date '2016-01-31') order by D asc");
    });
*/
    it('expected getQuery to return a string of query', () => {
        let startDate = '2014-11-01',
            endDate = '2015-05-01',
            query = builder.getQuery(startDate, endDate);
        expect(query).toEqual("SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O WHERE D is not null AND toDate(D) >= toDate(date '"+ startDate +"') AND toDate(D) <= toDate(date '"+ endDate +"') order by D asc");
    });

 });
