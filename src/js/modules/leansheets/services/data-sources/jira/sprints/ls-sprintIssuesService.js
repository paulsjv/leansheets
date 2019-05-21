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

    return ['$log','$q','$moment','ls-jiraQueryService','ls-issueService',function ($log, $q, $moment, jiraQueryService, issueService) {
        var localUrl, dataSourceUri, issues, headers, method, timeout, includedIssueTypes, getSubtasks, 
            jiraDateTimeFormat, datePickerMomentFormat, leadTimeStartStatuses, leadTimeStopStatuses;

        this.constructService = function(config, issuesConfig, datePickerFormat) {
            $log.debug('Constructing JIRA issueService');
            (config.dataUrl.localUrl) ? localUrl = config.dataUrl.localUrl : localUrl = null;
            dataSourceUri = config.dataUrl.dataSourceUri;
            headers = config.dataUrl.headers;
            method = issuesConfig.method;
            jiraDateTimeFormat = config.timeformat;
            datePickerMomentFormat = datePickerFormat;
            getSubtasks = issuesConfig.getSubtasks;
            timeout = issuesConfig.timeout;
            issues = issuesConfig;
            leadTimeStartStatuses = config.leadTimeStartStatuses;
            leadTimeStopStatuses = config.leadTimeEndStatuses;
            // this is the field to let the app know what issueTypes to include in the results
            includedIssueTypes = config.dataUrl.sprints.includedIssueTypes;
        };

        this.getSprintIssues = function(sprint) {
            $log.debug('ls-sprintIssuesService: getSprintIssues');
            var deferred = $q.defer(),
                promise = deferred.promise,
                restUrl = getIssueRestUri(sprint.id),
                params = getIssueParams(sprint.id),
                foundIssues = [],
                handleResponse = function(response){
                    $log.debug('ls-sprintIssuesService: handleResponse():', response);
                    if (!jiraQueryService.isError(response, localUrl)) {
                        $log.debug('ls-sprintIssuesService: success:', response);

                        if (response.total > response.maxResults) {
                            // save found issues and loop through to 
                            // get the rest of the issues
                            foundIssues.push(issueService.parseFoundIssues(response.issues, sprint.startDate));
                            getOutstandingIssues(response, deferred, foundIssues, sprint.id, sprint.startDate);
                        } else {
                            // resolve promise with found issues
                            $log.debug('ls-sprintIssuesService: success:', response);
                            deferred.resolve(issueService.parseFoundIssues(response.issues, sprint.startDate));
                        }
                    } else {
                        $log.debug('ls-sprintIssuesService: Error:', response);
                        deferred.reject(response);
                    }
                };

            jiraQueryService.query(method, headers, restUrl, params, handleResponse, timeout);
            
            return promise;
        };

        // call from issuesService and remove the code below
        var getSubtasks = function() {

        };

        /**
         * Gets the lead time if sprints are being used.  The sprint service should have
         * added a new field to the issue object, commitDate (e.g. issue.commitDate) with the 
         * date of the sprint start.
         * @param {} issues 
         */
        this.getSprintIssuesAsCsv = function(issues) {
            // End Date, Lead Time, Key, Summary, Start Date \n
            var csv = '';
            issues.forEach(function(issue){
                // only add certain statuses

                // usually don't get a lead time if there is no resolutiondate meaning the issues hasn't moved to "Done"
                // only allow issues that have a lead time as some might not be "Done" yet.
                var leadTimeStop;
                if (isIssueTypeIncluded(issue.issueType) && 
                    (leadTimeStop = isIssueDone(leadTimeStop, issue.transitions, leadTimeStopStatuses))) {
                        // have to get the "In Progress" start date because the issue may have been started 
                        // before the sprint start time.
                        var issueTimeStart = issueService.getLeadTimeDate(leadTimeStart, issue.transitions, leadTimeStartStatuses);
                        var leadTimeStart = issueService.getOlderDate(issueTimeStart, issue.commitDate, jiraDateTimeFormat);
                        csv += issueService.getCsv(leadTimeStop, leadTimeStart, issue.key, issue.summary);
                }
            });
            return csv;
        };

        var isIssueTypeIncluded = function(issueType) {
            var included = false;
            includedIssueTypes.forEach(function(includedIssueType){
                (issueType.name === includedIssueType) ? included = true : '';
            });
            return included;
        };

        var isIssueDone = function(leadTime, transitions, statuses) {
            return issueService.getLeadTimeDate(leadTime, transitions, statuses);
        };

        var getOutstandingIssues = function(response, deferred, foundIssues, sprintId, sprintStartDate) {
            var promises = [], params;
            for (var totalResults = response.startAt + response.maxResults; 
                     totalResults <= response.total;
                     totalResults = response.maxResults + totalResults) {
                $log.debug('totalResults:', totalResults);
                params = getIssueParams(sprintId, totalResults);
                promises.push(jiraQueryService.query(method, headers, getIssueRestUri(), params, null, timeout));
            }
            
            $q.all(promises).then(function(success){
                $log.debug('ls-sprintIssuesService: Success:', success);

                foundIssues.push(success.map(function(issues){
                    return issueService.parseFoundIssues(issues.data.issues, sprintStartDate);
                }));

                deferred.resolve(foundIssues.flat().flat());
            },function(error) {
                $log.debug('ls-sprintIssuesService: Error:', error);
                deferred.reject(error);
            });
        };

        var getIssuesUrl = function(sprintId) {
            return issues.url.replace('{sprintId}', sprintId);
        };

        var getIssueParams = function(sprintId, startAt = 0) {
            let params = {
                    jql: issues.jql,
                    expand: issues.expand,
                    fields: issues.fields,
                    startAt: (startAt > 0) ? startAt : issues.startAt,
                    maxResults: issues.maxResults
            };

            if (localUrl) {
                return { 
                            url: dataSourceUri + getIssuesUrl(sprintId) + 
                            '?jql=' + params.jql +
                            '&expand=' + params.expand +
                            '&fields=' + params.fields +
                            '&startAt=' + params.startAt +
                            '&maxResults=' + params.maxResults
                        };
            }
            return params;
        };

        var getIssueRestUri = function(sprintId) {
            let url;
            if (localUrl) {
                url = localUrl;
            } else {
                url = dataSourceUri + getIssuesUrl(sprintId); 
            }
            return url;
        };
    }];
});