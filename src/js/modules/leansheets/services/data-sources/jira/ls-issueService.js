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

    return ['$log','$q','$moment','ls-jiraQueryService',function ($log, $q, $moment, jiraQueryService) {
        var localUrl, dataSourceUri, issues, headers, method, timeout, getSubtasks, 
            jiraDateTimeFormat, datePickerMomentFormat, leadTimeStartStatuses, leadTimeStopStatuses,
            that = this;

        this.constructService = function(config, datePickerFormat) {
            $log.debug('Constructing JIRA issueService');
            (config.dataUrl.localUrl) ? localUrl = config.dataUrl.localUrl : localUrl = null;
            dataSourceUri = config.dataUrl.dataSourceUri;
            issues = config.dataUrl.issues;
            headers = config.dataUrl.headers;
            method = issues.config.method;
            jiraDateTimeFormat = config.timeformat;
            datePickerMomentFormat = datePickerFormat;
            getSubtasks = issues.config.getSubtasks;
            timeout = issues.config.timeout;
            leadTimeStartStatuses = config.leadTimeStartStatuses;
            leadTimeStopStatuses = config.leadTimeEndStatuses;
        };

        this.getAllIssues = function(startDate, endDate) {
            $log.debug('ls-issueService: getAllIssues');
            var deferred = $q.defer(),
                promise = deferred.promise,
                restUrl = getIssueRestUri(),
                params = getIssueParams(startDate, endDate),
                foundIssues = [],
                handleResponse = function(response){
                    $log.debug('ls-issueService: handleResponse():', response);
                    if (!jiraQueryService.isError(response, localUrl)) {
                        $log.debug('ls-issuesService: success:', response);

                        if (response.total > response.maxResults) {
                            // save found issues and loop through to 
                            // get the rest of the issues
                            foundIssues.push(that.parseFoundIssues(response.issues));
                            getOutstandingIssues(response, deferred, foundIssues, startDate, endDate);
                        } else {
                            // resolve promise with found issues
                            $log.debug('ls-issuesService: success:', response);
                            deferred.resolve(that.parseFoundIssues(response.issues));
                        }
                    } else {
                        $log.debug('ls-issuesService: Error:', response);
                        deferred.reject(response);
                    }
                };

            jiraQueryService.query(method, headers, restUrl, params, handleResponse, timeout);
            
            return promise;
        };

            // get all issues from jql
            // if getSubtasks === true then make the calls to get all the subtask work
        var getSubtasks = function() {

        };
        
        /**
         * In future should cache the data and the dates used so that don't have to go 
         * across the wire for every query.  Also, makes it easier to do filtering of 
         * the issues etc.
         */
        this.getIssuesAsCsv = function(issues) {
            // End Date, Lead Time, Key, Summary, Start Date \n
            var csv = '';
            issues.forEach(function(issue){
                var leadTimeStart = that.getLeadTimeDate(leadTimeStart, issue.transitions, leadTimeStartStatuses),
                    leadTimeStop = that.getLeadTimeDate(leadTimeStop, issue.transitions, leadTimeStopStatuses);
                csv += that.getCsv(leadTimeStop, leadTimeStart, issue.key, issue.summary);
            });
            return csv;
        };

        this.getCsv = function(leadTimeStop, leadTimeStart, key, summary) {
            return formatDate(leadTimeStop) + ',' + calculateLeadTime(leadTimeStart, leadTimeStop) + ',' + key + ',' + removeCommas(summary) + ',' + formatDate(leadTimeStart) + "\n";
        };

        var formatDate = function(date, formatFrom = jiraDateTimeFormat, formatTo = 'M-D-YYYY') {
            return $moment(date, formatFrom).format(formatTo);
        };

        var removeCommas = function(string) {
            return string.replace(/,/g, ' ');
        };

        var calculateLeadTime = function(leadTimeStart, leadTimeStop) {
            let leadTime = $moment(leadTimeStart, jiraDateTimeFormat).businessDiff($moment(leadTimeStop, jiraDateTimeFormat));
            return leadTime + 1; // adding 1 day to all to include items that started and finished on the same day.
        };

        this.getLeadTimeDate = function(leadTime, transitions, statuses) {
            transitions.forEach(function(transition){
                statuses.forEach(function(status){
                    if (status === transition.to) {
                        // if there is a start time then compare 
                        // and see which date is older
                        if (leadTime) {
                            leadTime = that.getOlderDate(leadTime, transition.time, jiraDateTimeFormat);
                        } 
                        // else if there is no start time then
                        // set the leadTimeStart to the current
                        // timestamp.
                        else {
                            leadTime = transition.time;
                        }
                    }
                })
            });
            return leadTime;
        };

        this.getOlderDate = function(date1, date2, timeFormat = 'YYYY-MM-DD') {
            if ($moment(date1, timeFormat).isSameOrBefore($moment(date2,timeFormat))) {
                return date1;
            }
            return date2;
        };

        this.areDatesEqual = function(date1, date2, timeFormat = 'YYYY-MM-DD') {
            return $moment(date1, timeFormat).isSame($moment(date2, timeFormat))
        }

        this.isDateBetween = function(date, start, end, timeFormat = 'YYYY-MM-DD') {
            if (date === null) { return false; }
            var mdate = $moment(date, jiraDateTimeFormat).format(timeFormat);
            var sdate = $moment(start, datePickerMomentFormat).format(timeFormat);
            var edate = $moment(end, datePickerMomentFormat).format(timeFormat);
            return $moment(mdate).isBetween(sdate, edate, null, '[]');
        }

        var getOutstandingIssues = function(response, deferred, foundIssues, startDate, endDate) {
            var promises = [], params;
            for (var totalResults = response.startAt + response.maxResults; 
                     totalResults <= response.total;
                     totalResults = response.maxResults + totalResults) {
                $log.debug('totalResults:', totalResults);
                params = getIssueParams(startDate, endDate, totalResults);
                promises.push(jiraQueryService.query(method, headers, getIssueRestUri(), params, null, timeout));
            }
            
            $q.all(promises).then(function(success){
                $log.debug('ls-issueService: Success:', success);

                foundIssues.push(success.map(function(issues){
                    return that.parseFoundIssues(issues.data.issues);
                }));

                //foundIssues = parseFoundIssues(success);
                deferred.resolve(foundIssues.flat().flat());
            },function(error) {
                $log.debug('ls-issueService: Error:', error);
                deferred.reject(error);
            });
        };

        this.parseFoundIssues = function(issues, sprintCommitDate = null) {
            return issues.map(function(issue){
                var rtnIssue = {
                        key: issue.key,
                        self: issue.self,
                        //assignee: issue.fields.assignee,
                        //components: issue.fields.components,
                        //creator: issue.fields.creator,
                        //description: issue.fields.description,
                        //duedate: issue.fields.duedate,
                        //fixVersions: issue.fields.fixVersions,
                        //issueLinks: issue.fields.issuelinks,
                        issueType: issue.fields.issuetype,
                        labels: issue.fields.labels,
                        project: issue.fields.project,
                        //reporter: issue.fields.reporter,
                        resolutiondate: issue.fields.resolutiondate,
                        createddate: issue.fields.created,
                        //status: issue.fields.status,
                        children: issue.fields.subtasks,
                        //parentKey: issue.fields.customfield_10006,
                        summary: issue.fields.summary,
                        transitions: getTransitions(issue.changelog.histories)
                    };
                (sprintCommitDate) ? rtnIssue.commitDate = sprintCommitDate : '';
                (sprintCommitDate) ? rtnIssue.points = getPoints(issue.changelog.histories) : '';
                
                return rtnIssue;
            });
        };

        var getPoints = function(histories) {
            let created = null, points = null;
            histories.forEach(function(history){
                history.items.filter(function(item) {
                            if (item.field === "Story Points") {
                                (created) ?
                                    created = that.getOlderDate(history.created, created, jiraDateTimeFormat) :
                                    created = history.created;
                                points = item.toString;
                            }
                        });
            });
            return points;
        };

        var getTransitions = function(histories) {
            let transitions = [];
            histories.forEach(function(history){
                history.items.filter(function(item) {
                            if (item.field === "status") {
                                transitions.push( { time: history.created, from: item.fromString, to: item.toString });
                            }
                        });
            });
            return transitions;
        };

        var getIssuesUrl = function() {
            return issues.config.url;
        };

        var getStartAndEndDateUrl = function(jql, startDate, endDate) {
            let str = jql.replace('{startDate}', formatDate(startDate, datePickerMomentFormat, jiraDateTimeFormat.split('T')[0]).toString());
            str = str.replace('{endDate}', formatDate(endDate, datePickerMomentFormat, jiraDateTimeFormat.split('T')[0]).toString());
            return str;

        }

        var jqlEmptyOrNull = function(jql) {
            return (jql === null || jql === '');
        }

        var jqlHasDates = function(jql) {
            return jql.indexOf('{startDate}') || jql.indexOf('{endDate}');
        }

        var getIssueParams = function(startDate, endDate, startAt = 0) {
            let params = {
                    jql: (!jqlEmptyOrNull(issues.config.jql) && jqlHasDates(issues.config.jql)) ? getStartAndEndDateUrl(issues.config.jql, startDate, endDate) : '',
                    expand: issues.config.expand,
                    fields: issues.config.fields,
                    startAt: (startAt > 0) ? startAt : issues.config.startAt,
                    maxResults: issues.config.maxResults
            };
            $log.debug('ls-issueService: params', params);
            if (localUrl) {
                return { 
                            url: dataSourceUri + getIssuesUrl() + 
                            '?jql=' + params.jql +
                            '&expand=' + params.expand +
                            '&fields=' + params.fields +
                            '&startAt=' + params.startAt +
                            '&maxResults=' + params.maxResults
                        };
            }
            return params;
        };

        var getIssueRestUri = function() {
            let url;
            if (localUrl) {
                url = localUrl;
            } else {
                url = dataSourceUri + getIssuesUrl(); 
            }
            return url;
        };
    }];
});