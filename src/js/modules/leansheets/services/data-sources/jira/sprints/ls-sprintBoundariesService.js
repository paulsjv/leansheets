/**
 * The services/ directory should only include angular service definitions.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Service` suffix
 *
 * i.e. configService.js
 */
define(['angular'], function (ng) {
    'use strict';

    return ['$log','$q','$moment','ls-jiraQueryService', function ($log, $q, $moment, jiraQueryService) {
        
        var localUrl, dataSourceUri, sprints, headers, method, jiraDateTimeFormat,
            datePickerMomentFormat, timeout;

        this.constructService = function(config, boundariesConfig, datePickerFormat) {
            $log.debug('Constructing JIRA SprintService');
            (config.dataUrl.localUrl) ? localUrl = config.dataUrl.localUrl : localUrl = null;
            dataSourceUri = config.dataUrl.dataSourceUri;
            sprints = boundariesConfig;
            headers = config.dataUrl.headers;
            method = boundariesConfig.method;
            jiraDateTimeFormat = config.timeformat;
            datePickerMomentFormat = datePickerFormat;
            timeout = boundariesConfig.timeout;
        };

        // https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
        this.isSprint = function() {
            return sprints instanceof Object && sprints.constructor === Object;
        };

        /**
         * If user is not using sprints then this code and methods
         * below should never be executed.
         */
        this.getAllSprints = function(startDate, endDate) {
            $log.debug('ls-sprintBoundariesService: getAllSprints');
            var deferred = $q.defer(),
                promise = deferred.promise,
                restUrl = getSprintRestUri(),
                params = getSprintParams(),
                foundSprints = [],
                handleResponse = function(response){
                    $log.debug('ls-sprintService: handleResponse():', response);
                    if (!jiraQueryService.isError(response, localUrl)) {
                        // return only the sprints for the date range passed
                        // the dates are still the ones that were passed into 
                        // the function!
                        if (!response.isLast) {
                            foundSprints.push(response.values);
                            params = getSprintParams(response.startAt + response.maxResults);
                            jiraQueryService.query(method, headers, restUrl, params, handleResponse, timeout);
                        } else {
                            foundSprints.push(response.values);
                            deferred.resolve(sprintsAfterStartEndDate(foundSprints.flat(), startDate, endDate));
                        }
                    } else {
                        $log.debug('ls-sprintBoundariesService: Error:', response);
                        deferred.reject(response);
                    }
                };

            jiraQueryService.query(method, headers, restUrl, params, handleResponse, timeout);
            
            return promise;
        };

        /**
         * 
         * @param {*} sprints 
         * @param {*} startDate 
         * @param {*} endDate 
         */
        var sprintsAfterStartEndDate = function(sprints, startDate, endDate) {
            let foundSprints, isStartDateBetween = false, isEndDateBetween = false;
            foundSprints = sprints.filter(function(sprint) {
                if (sprint.state !== 'future') {
                    !isStartDateBetween ? isStartDateBetween = isDateBetweenSprintDates(startDate, sprint.startDate, sprint.endDate) : '';
                    !isEndDateBetween ? isEndDateBetween = isDateBetweenSprintDates(endDate, sprint.startDate, sprint.endDate) : '';
                    // if start date is between a sprint and end date is not
                    // return the current sprint found until end date is found
                    if (isStartDateBetween && !isEndDateBetween) {
                        return sprint;
                    // when end date is found then return that sprint but
                    // also make sure to reset start date and end date because
                    // we should not return any furhter sprints.
                    } else if (isStartDateBetween && isEndDateBetween) {
                        isStartDateBetween = false;
                        isEndDateBetween = false;
                        return sprint;
                    }
                }
            });
            return foundSprints;
        }

        var isDateBetweenSprintDates = function(date, sprintStartDate, sprintEndDate) {
            // Example: isStartDateBetween = $moment().isBetween(momentA, momentB);
            let startDate = $moment(sprintStartDate, jiraDateTimeFormat); // jira sprint start date
            let endDate = $moment(sprintEndDate, jiraDateTimeFormat); // jira sprint end date
            let thisDate = $moment(date, datePickerMomentFormat); // date picker start/end date
            // https://momentjs.com/docs/#/query/is-between/
            return thisDate.isBetween(startDate, endDate, null, '[]');
        };

        var getSprintsUrl = function() {
            return sprints.url.replace('{boardId}', sprints.boardId);
        };

        var getSprintParams = function(startAt = 0) {
            let params = {
                    jql: sprints.jql,
                    expand: sprints.expand,
                    fields: sprints.fields,
                    startAt: (startAt > 0) ? startAt : sprints.startAt,
                    maxResults: sprints.maxResults
            };

            if (localUrl) {
                return { 
                            url: dataSourceUri + getSprintsUrl() + 
                            '?jql=' + params.jql +
                            '&expand=' + params.expand +
                            '&fields=' + params.fields +
                            '&startAt=' + params.startAt +
                            '&maxResults=' + params.maxResults
                        }
            }
            return params;
        };

        var getSprintRestUri = function() {
            let url;
            if (localUrl) {
                url = localUrl;
            } else {
                url = dataSourceUri + getSprintsUrl(); 
            }
            return url;
        };
    }];
});