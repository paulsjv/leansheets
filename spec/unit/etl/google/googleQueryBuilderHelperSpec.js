import { buildSelectClause, buildWhereClause } from 'www/js/etl/google/googleQueryBuilderHelper';

describe('The GoogleQueryBuilderHelper', () => {
/*
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
*/
    it('expected the buildSelectClause to return comma seperated string', () => {
        let qConfig = {
            'id': 'A',
            'description': 'B',
            'states': ['D','E','F','G']
        };
        expect(buildSelectClause(qConfig)).toEqual('SELECT A,B,D,E,F,G');
   });

    it('expected the buildWhereClause to return a string', () => {
        let qConfig = {
            'states': ['D','E']
        };
        expect(buildWhereClause(qConfig, '2015-12-31','2016-01-31')).toEqual("WHERE D is not null AND toDate(D) >= toDate(date '2015-12-31') AND toDate(D) <= toDate(date '2016-01-31') order by D asc");
    });

    it('expected the buildWhereClause to throw config property not found error', () => {
        let qConfig = {
            'error': ['D','E']
        };
        expect(() => { buildWhereClause(qConfig, '2015-12-31','2016-01-31'); }).toThrowError('GoogleQueryBuilderHelper - Query Config does not have property: states');
    });

    it('expected the buildWhereClause to throw config property empty error', () => {
        let qConfig = {
            'states': '' 
        };
        expect(() => { buildWhereClause(qConfig, '2015-12-31','2016-01-31'); }).toThrowError('GoogleQueryBuilderHelper - Query Config property "states" is empty!');
    });

    it('expected the buildSelectClause to throw array error', () => {
        let qConfig = {
            'states': ['D', 1]
        };
        expect(() => { buildSelectClause(qConfig); }).toThrowError('GoogleQueryBuilderHelper - Query Config only supports strings in arrays');
    });

 it('expected to validate the date and date format of YYYY-MM-DD', () => {
        expect(true).toBeFalsy();
    });

});


