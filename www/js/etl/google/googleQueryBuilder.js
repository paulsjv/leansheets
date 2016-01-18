import { buildSelectClause, buildWhereClause } from 'www/js/etl/google/googleQueryBuilderHelper';

export default class GoogleQueryBuilder {

    constructor($log, qConfig) {
        $log.debug('GoogleQueryBuilder - in constructor');
        this.log = $log;
        this.queryConfig = qConfig;
    }

    getQuery(startDate, endDate) {
        this.log.debug('GoogleQueryBuilder - startDate: ', startDate);
        this.log.debug('GoogleQueryBuilder - endDate: ', endDate);
        return buildSelectClause(this.queryConfig) + ' ' + buildWhereClause(this.queryConfig, startDate, endDate);
    }

}


