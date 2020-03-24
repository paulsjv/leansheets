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

    return ['$log','$q','ls-jiraQueryService','ls-issueService',function ($log, $q, jiraQueryService, issueService) {
        var localUrl, dataSourceUri, download, headers, method, timeout, createdDatePrefix, 
            jiraDateTimeFormat, datePickerMomentFormat, leadTimeStartStatuses, leadTimeStopStatuses,
            isDownloadServiceConfigured = true;

        this.constructService = function(config, datePickerFormat) {
            $log.debug('Constructing JIRA issuesDownloadService');
            (config.dataUrl.localUrl) ? localUrl = config.dataUrl.localUrl : localUrl = null;
            dataSourceUri = config.dataUrl.dataSourceUri;
            headers = config.dataUrl.headers;
            datePickerMomentFormat = datePickerFormat;
            jiraDateTimeFormat = config.timeformat;
            download = config.dataUrl.issues;
            method = download.config.method;
            timeout = download.config.timeout;
            
            /// need to figure these out for download servcie from config.queries and 
            /// put something in the UI to select workflow status
            leadTimeStartStatuses = config.leadTimeStartStatuses;
            leadTimeStopStatuses = config.leadTimeEndStatuses;
            
        };

        this.isServiceConfigured = function() {
            return isDownloadServiceConfigured;
        };

        // var getJqlForIssues = function(startDate, endDate, jql) {
        //     var start = formatDate(startDate, datePickerMomentFormat, jiraDateTimeFormat.split('T')[0]).toString(),
        //         end = formatDate(endDate, datePickerMomentFormat, jiraDateTimeFormat.split('T')[0]).toString();
        //     jql += addDateToJql(start, createdDatePrefix, '>=') + addDateToJql(end, createdDatePrefix, '<=');
        //     return jql;
        // }

        // var addDateToJql = function(date, prefix, func) {
        //     return ` AND ${prefix} ${func} ${date}`
        // };

        this.getAllIssuesForDownload = function(jql) {
            $log.debug('ls-issuesDownloadService: getAllIssuesForDownload');
            var deferred = $q.defer(),
                promise = deferred.promise,
                restUrl = getDownloadRestUri(),
                params = getIssueParams(0, jql),
                foundIssues = [],
                handleResponse = function(response){
                    $log.debug('ls-issuesDownloadService: handleResponse():', response);
                    if (!jiraQueryService.isError(response, localUrl)) {
                        $log.debug('ls-issuesDownloadService: success:', response);

                        if (response.total > response.maxResults) {
                            // save found issues and loop through to 
                            // get the rest of the issues
                            foundIssues.push(parseFoundIssues(response.issues));
                            getOutstandingIssues(response, deferred, foundIssues, jql);
                        } else {
                            // resolve promise with found issues
                            $log.debug('ls-issuesDownloadService: success:', response);
                            deferred.resolve(parseFoundIssues(response.issues));
                        }
                    } else {
                        $log.debug('ls-issuesDownloadService: Error:', response);
                        deferred.reject(response);
                    }
                };

            jiraQueryService.query(method, headers, restUrl, params, handleResponse, timeout);
            
            return promise;
        };

        this.getIssuesAsCsvForDownload = function(issues) {
            $log.debug('ls-issuesDownloadService: getIssuesAsCsvForDownload()');
            var csv = "Key,Summary,Created Date,Start Date,End Date\n";
            issues.forEach(function(issue){
                // key, summary, formatDate(createddate), startdate, enddate (or empty if none)
                var leadTimeStart = getLeadTimeDate(leadTimeStart, issue.transitions, leadTimeStartStatuses),
                    leadTimeStop = getLeadTimeDate(leadTimeStop, issue.transitions, leadTimeStopStatuses);
                    if (leadTimeStart) {
                        leadTimeStart = formatDate(leadTimeStart);
                    } else { leadTimeStart = ''; }
                    if (leadTimeStop) {
                        leadTimeStop = formatDate(leadTimeStop);
                    } else { leadTimeStop = ''; }
                csv +=  issue.key + ',' + 
                        removeCommas(issue.summary) + ',' + 
                        formatDate(issue.createddate) + ',' + 
                        leadTimeStart + ',' + 
                        leadTimeStop + "\n";
            });
            return csv;
        };
        
        var getOutstandingIssues = function(response, deferred, foundIssues, jql) {
            var promises = [], params;
            for (var totalResults = response.startAt + response.maxResults; 
                     totalResults <= response.total;
                     totalResults = response.maxResults + totalResults) {
                $log.debug('totalResults:', totalResults);
                params = getIssueParams(totalResults, jql);
                promises.push(jiraQueryService.query(method, headers, getIssueRestUri(), params, null, timeout));
            }
            
            $q.all(promises).then(function(success){
                $log.debug('ls-issueDownloadService: Success:', success);

                foundIssues.push(success.map(function(issues){
                    return parseFoundIssues(issues.data.issues);
                }));

                deferred.resolve(foundIssues.flat().flat());
            },function(error) {
                $log.debug('ls-issueDownloadService: Error:', error);
                deferred.reject(error);
            });
        };

        this.getIssuesAsCsvForDownload = function(issues) {
            $log.debug('ls-issueDownloadService: getIssuesAsCsvForDownload()');
            var csv = "Key,Summary,Issue Type,Created Date,Start Date,Done Date\n";
            issues.forEach(function(issue){
                // key, summary, formatDate(createddate), startdate, enddate (or empty if none)
                var leadTimeStart = getLeadTimeDate(leadTimeStart, issue.transitions, leadTimeStartStatuses),
                    leadTimeStop = getLeadTimeDate(leadTimeStop, issue.transitions, leadTimeStopStatuses);
                    if (leadTimeStart) {
                        leadTimeStart = formatDate(leadTimeStart);
                    } else { leadTimeStart = ''; }
                    if (leadTimeStop) {
                        leadTimeStop = formatDate(leadTimeStop);
                    } else { leadTimeStop = ''; }
                csv +=  issue.key + ',' + 
                        removeCommas(issue.summary) + ',' + 
                        issue.issueType.name + ',' +
                        formatDate(issue.createddate) + ',' + 
                        leadTimeStart + ',' + 
                        leadTimeStop + "\n";
            });
            return csv;
        };

        var formatDate = function(date, formatFrom = jiraDateTimeFormat, formatTo = 'M-D-YYYY') {
            return issueService.formatDate(date, formatFrom, formatTo);
        };

        var removeCommas = function(string) {
            return issueService.removeCommas(string);
        };

        var getLeadTimeDate = function(leadTime, transitions, statuses) {
            return issueService.getLeadTimeDate(leadTime, transitions, statuses);
        };

        var parseFoundIssues = function(issues, sprintCommitDate = null) {
            return issueService.parseFoundIssues(issues);
        };

        var getDownloadUrl = function() {
            return download.config.url;
        };

        var getIssueParams = function(startAt = 0, jqlparam) {
            let params = {
                    jql: jqlparam,
                    expand: download.config.expand,
                    fields: download.config.fields,
                    startAt: (startAt > 0) ? startAt : download.config.startAt,
                    maxResults: download.config.maxResults
            };
            $log.debug('ls-issuesDownloadService: params', params);
            if (localUrl) {
                return { 
                            url: dataSourceUri + getDownloadUrl() + 
                            '?jql=' + params.jql +
                            '&expand=' + params.expand +
                            '&fields=' + params.fields +
                            '&startAt=' + params.startAt +
                            '&maxResults=' + params.maxResults
                        };
            }
            return params;
        };

        var getDownloadRestUri = function() {
            let url;
            if (localUrl) {
                url = localUrl;
            } else {
                url = dataSourceUri + getDownloadUrl(); 
            }
            return url;
        };
    }];
});