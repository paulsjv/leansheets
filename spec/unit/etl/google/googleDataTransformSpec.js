import GoogleDataTransform from 'www/js/etl/google/googleDataTransform';
import ConfigService from 'www/js/services/configService';
import { CONFIG } from 'spec/mocks/config';
import { LARGE_GDATA as GDATA, EXCLUDE_GDATA, SINGLE_ROW_GDATA, EXCLUDE_NULL_GDATA } from 'spec/mocks/gdata';
import Log from 'spec/mocks/log';

describe('The GoogleDataTransform', () => {

    let transform;
    let log = new Log();
    let configService;
    let queryConfig;

    beforeEach(() => {
        configService = new ConfigService(log, CONFIG); 
        queryConfig = configService.getDataSource("Team 1").queryConfig;
        log.setEnabled(false);
        transform = new GoogleDataTransform(log, queryConfig); 
    });

    it('expected transform object to not be null', () => {
        expect(transform).not.toBeNull();
    });

    it('expected to return correctly formatted meta data headers', () => {
        let states = ["State 1 (Arrival Date)","State 2 (Work stage 1)","State 3 (Work stage 2)","State 4 (Done date)"];
        let tags = ["Tag 1","Tag 2","Tag 3","Tag 4","Tag 5"];
        let risks = ["Risk 1","Risk 2","Risk 3"];
        expect(transform.transformData(GDATA).meta.headers).toEqual({ "id":"Id", "description":"Title","link":"Link", "states":states, "tags":tags, "risks":risks });
    });

    it('expected to return correctly formatted meta data map', () => {
        let states = [3,4,5,6];
        let tags = [7,8,9,10,11];
        let risks = [12,13,14];
        expect(transform.transformData(GDATA).meta.map).toEqual({"id":0,"description":1,"link":2,"states":states,"tags":tags,"risks":risks});
    });

    it('expected to return correctly formatted data', () => {
       let expected = [[ "115", "Sample Item 16", "http://dummy.com/16", "12/3/2014", "12/8/2014", "1/5/2015", "1/21/2015", "Discovery", "Standard", "Documentation", "Platform", "No", "High", "No One Knows", "Customer will stay" ]];
        expect(transform.transformData(SINGLE_ROW_GDATA).data).toEqual(expected);
    });

    it('expected to return correctly from data that should not be a part of the transform', () => {
        let expected = [[ "115", "Sample Item 16", "http://dummy.com/16", "12/3/2014", "12/8/2014", "1/5/2015", "1/21/2015", "Discovery", "Standard", "Documentation", "Platform", "No", "High", "No One Knows", "Customer will stay" ]];
        expect(transform.transformData(EXCLUDE_GDATA).data).toEqual(expected);
    });

    it('expected to return correclty form meta headers and meta data map that should not be a part of the transform', () => {
        let states = ["State 1 (Arrival Date)","State 2 (Work stage 1)","State 3 (Work stage 2)","State 4 (Done date)"];
        let tags = ["Tag 1","Tag 2","Tag 3","Tag 4","Tag 5"];
        let risks = ["Risk 1","Risk 2","Risk 3"];
        expect(transform.transformData(EXCLUDE_GDATA).meta.headers).toEqual({ "id":"Id", "description":"Title","link":"Link", "states":states, "tags":tags, "risks":risks });
    });

    it('expected to return correctly formatted meta data map from data that should have excluded columns', () => {
        let states = [3,4,5,6];
        let tags = [7,8,9,10,11];
        let risks = [12,13,14];
        expect(transform.transformData(EXCLUDE_GDATA).meta.map).toEqual({"id":0,"description":1,"link":2,"states":states,"tags":tags,"risks":risks});
    });

    it('expected to return correctly formatted data when data has nulls and excluded values', () => {
        let queryConfig = {
                "id": "A",
                "description": "B",
                "states": [ "D","E","F","G" ],
                "tags": [ "H","I","J","K","L" ],
                "risks": [ "M","N","O" ]
            };
        let expected = [[ "115", "Sample Item 16", "12/3/2014", null, null, null, "Discovery", "Standard", "Documentation", "Platform", "No", "High", "No One Knows", "Customer will stay" ]];
        let transform = new GoogleDataTransform(log, queryConfig);
        expect(transform.transformData(EXCLUDE_NULL_GDATA).data).toEqual(expected);
    });

});

