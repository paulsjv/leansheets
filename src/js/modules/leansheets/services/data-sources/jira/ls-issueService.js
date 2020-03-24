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

    return ['$log','$q','$moment','ls-jiraQueryService','ls-configService','ls-loadingStatusService',
            function ($log, $q, $moment, jiraQueryService, configService, loadingStatusService) {
        var localUrl, dataSourceUri, issues, headers, method, timeout, maxResults,
            jiraDateTimeFormat, datePickerMomentFormat, leadTimeStartStatuses, leadTimeStopStatuses,
            that = this;

        this.constructService = function(instance) {
            $log.debug('Constructing JIRA issueService');
            (instance.dataUrl.localUrl) ? localUrl = instance.dataUrl.localUrl : localUrl = null;
            dataSourceUri = instance.dataUrl.dataSourceUri;
            issues = configService.getDataSourcesConfigs()[instance.dataSource].issues;
            headers = instance.dataUrl.headers;
            method = issues.config.method;
            maxResults = issues.config.maxResults;
            jiraDateTimeFormat = instance.timeformat;
            timeout = issues.config.timeout;
            // leadTimeStartStatuses = config.leadTimeStartStatuses;
            // leadTimeStopStatuses = config.leadTimeEndStatuses;
        };

        this.totalItemsToLoad = function(query, startAt = 0) {
            $log.debug('ls-issueService: totalItemsToLoad()');
            loadingStatusService.reset();
            var deferred = $q.defer(),
                promise = deferred.promise,
                restUrl = getIssueRestUri(),
                params = getIssueParams(startAt, query),
                callback = function(response) {
                    $log.debug('ls-issuesService - totalItemsToLoad: success:', response);
                    if (!jiraQueryService.isError(response, localUrl)) {
                        $log.debug('ls-issuesService - totalItemsToLoad: success:', response);

                        deferred.resolve({
                            total: response.total
                        });
                    } else {
                        $log.debug('ls-issuesService: Error:', response);
                        deferred.reject(response);
                    }
                };

        jiraQueryService.query(method, headers, restUrl, params, callback, timeout);
        
        return promise;
        };

        this.getAllIssues = function(query, startAt = 0) {
            loadingStatusService.reset();
            $log.debug('ls-issueService: getAllIssues');
            var deferred = $q.defer(),
                promise = deferred.promise,
                restUrl = getIssueRestUri(),
                params = getIssueParams(startAt, query),
                // foundIssues = [],
                callback = function(response) {
                    $log.debug('ls-issuesService: success:', response);
                    if (!jiraQueryService.isError(response, localUrl)) {
                        $log.debug('ls-issuesService: success:', response);

                        if (response.total > response.maxResults) {
                            // save found issues and loop through to 
                            // get the rest of the issues
                            //foundIssues.push(that.parseFoundIssues(response.issues));
                            loadingStatusService.setTotal(response.total);
                            loadingStatusService.updateCount(response.maxResults);
                            getOutstandingIssues(response, deferred, query)
                            // deferred.resolve({
                            //     issues: that.parseFoundIssues(response.issues),
                            //     total: response.total
                            // });
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

        jiraQueryService.query(method, headers, restUrl, params, callback, timeout);
        
        return promise;
        };

        var getOutstandingIssues = function(response, deferred, query) {
            $log.debug('ls-issueService: getOutstnadingIssues():', response, query);
            var promises = [], params, issues = [],
                callback = function(response) {
                    loadingStatusService.updateCount(response.issues.length);
                };
            for (var totalResults = response.startAt + response.maxResults; 
                     totalResults <= response.total;
                     totalResults = response.maxResults + totalResults) {
                $log.debug('totalResults:', totalResults);
                params = getIssueParams(totalResults, query);
                promises.push(jiraQueryService.query(method, headers, getIssueRestUri(), params, callback, timeout));
            }
            
            $q.all(promises).then(function(success){
                $log.debug('ls-issueService: Success:', success);

                // foundIssues.push(success.map(function(issues){
                //     return that.parseFoundIssues(issues.data.issues);
                // }));

                success.map(item => {
                    item.data.issues.forEach(issue => {
                        issues.push(issue);
                    });
                });
                response.issues.forEach(issue => {
                    issues.push(issue);
                });

                $log.debug('ls-issueService: issues', issues);

                deferred.resolve(that.parseFoundIssues(issues));
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

        this.getOlderDate = function(date1, date2, timeFormat = 'YYYY-MM-DD') {
            if ($moment(date1, timeFormat).isSameOrBefore($moment(date2,timeFormat))) {
                return date1;
            }
            return date2;
        };

        var getIssuesUrl = function() {
            return issues.config.url;
        };

        var getIssueParams = function(startAt = 0, jqlparam) {
            let params = {
                    jql: jqlparam,
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

/************************************
 * All methods below are old and can be removed at some point.
 * 
 *  */        
        // var getJqlForIssues = function(jql, startDate, endDate) {
        //     return (!jqlEmptyOrNull(jql) && jqlHasDates(jql)) ? getStartAndEndDateUrl(jql, startDate, endDate) : '';
        // };

        // this.getAllIssuesOld = function(startDate, endDate) {
        //     $log.debug('ls-issueService: getAllIssues');
        //     var deferred = $q.defer(),
        //         promise = deferred.promise,
        //         restUrl = getIssueRestUri(),
        //         params = getIssueParams(0, getJqlForIssues(issues.config.jql, startDate, endDate)),
        //         foundIssues = [],
        //         handleResponse = function(response){
        //             $log.debug('ls-issueService: handleResponse():', response);
        //             if (!jiraQueryService.isError(response, localUrl)) {
        //                 $log.debug('ls-issuesService: success:', response);

        //                 if (response.total > response.maxResults) {
        //                     // save found issues and loop through to 
        //                     // get the rest of the issues
        //                     foundIssues.push(that.parseFoundIssues(response.issues));
        //                     getOutstandingIssues(response, deferred, foundIssues, startDate, endDate);
        //                 } else {
        //                     // resolve promise with found issues
        //                     $log.debug('ls-issuesService: success:', response);
        //                     deferred.resolve(that.parseFoundIssues(response.issues));
        //                 }
        //             } else {
        //                 $log.debug('ls-issuesService: Error:', response);
        //                 deferred.reject(response);
        //             }
        //         };

        //     jiraQueryService.query(method, headers, restUrl, params, handleResponse, timeout);
            
        //     return promise;
        // };

        // get all issues from jql
        // if getSubtasks === true then make the calls to get all the subtask work
        // var getSubtasks = function() {

        // };

        this.getIssuesAsCsvForDownload = function(issues) {
            $log.debug('ls-issueService: getIssuesAsCsvForDownload()');
            var csv = "Key,Summary,Created Date,Start Date,End Date\n";
            issues.forEach(function(issue){
                // key, summary, formatDate(createddate), startdate, enddate (or empty if none)
                var leadTimeStart = that.getLeadTimeDate(leadTimeStart, issue.transitions, leadTimeStartStatuses),
                    leadTimeStop = that.getLeadTimeDate(leadTimeStop, issue.transitions, leadTimeStopStatuses);
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

        this.formatDate = function(date, formatFrom = jiraDateTimeFormat, formatTo = 'M-D-YYYY') {
            return $moment(date, formatFrom).format(formatTo);
        };

        this.removeCommas = function(string) {
            return string.replace(/,/g, ' ');
        };

        var removeCommas = function(string) {
            return that.removeCommas(string);
        };

        var formatDate = function(date, formatFrom = jiraDateTimeFormat, formatTo = 'M-D-YYYY') {
            return that.formatDate(date, formatFrom, formatTo);
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

        // var getOutstandingIssuesOld = function(response, deferred, foundIssues, startDate, endDate) {
        //     var promises = [], params;
        //     for (var totalResults = response.startAt + response.maxResults; 
        //              totalResults <= response.total;
        //              totalResults = response.maxResults + totalResults) {
        //         $log.debug('totalResults:', totalResults);
        //         params = getIssueParams(totalResults, getJqlForIssues(issues.config.jql, startDate, endDate));
        //         promises.push(jiraQueryService.query(method, headers, getIssueRestUri(), params, null, timeout));
        //     }
            
        //     $q.all(promises).then(function(success){
        //         $log.debug('ls-issueService: Success:', success);

        //         foundIssues.push(success.map(function(issues){
        //             return that.parseFoundIssues(issues.data.issues);
        //         }));

        //         //foundIssues = parseFoundIssues(success);
        //         deferred.resolve(foundIssues.flat().flat());
        //     },function(error) {
        //         $log.debug('ls-issueService: Error:', error);
        //         deferred.reject(error);
        //     });
        // };

        // this.parseFoundIssuesOld = function(issues, sprintCommitDate = null) {
        //     return issues.map(function(issue){
        //         var rtnIssue = {
        //                 key: issue.key,
        //                 self: issue.self,
        //                 //assignee: issue.fields.assignee,
        //                 //components: issue.fields.components,
        //                 //creator: issue.fields.creator,
        //                 //description: issue.fields.description,
        //                 //duedate: issue.fields.duedate,
        //                 //fixVersions: issue.fields.fixVersions,
        //                 //issueLinks: issue.fields.issuelinks,
        //                 issueType: issue.fields.issuetype,
        //                 labels: issue.fields.labels,
        //                 project: issue.fields.project,
        //                 //reporter: issue.fields.reporter,
        //                 resolutiondate: issue.fields.resolutiondate,
        //                 createddate: issue.fields.created,
        //                 //status: issue.fields.status,
        //                 children: issue.fields.subtasks,
        //                 //parentKey: issue.fields.customfield_10006,
        //                 summary: issue.fields.summary,
        //                 transitions: getTransitions(issue.changelog.histories)
        //             };
        //         (sprintCommitDate) ? rtnIssue.commitDate = sprintCommitDate : '';
        //         (sprintCommitDate) ? rtnIssue.points = getPoints(issue.changelog.histories) : '';
                
        //         return rtnIssue;
        //     });
        // };
        
        // var getStartAndEndDateUrl = function(jql, startDate, endDate) {
        //     let str = jql.replace('{startDate}', formatDate(startDate, datePickerMomentFormat, jiraDateTimeFormat.split('T')[0]).toString());
        //     str = str.replace('{endDate}', formatDate(endDate, datePickerMomentFormat, jiraDateTimeFormat.split('T')[0]).toString());
        //     return str;
        // }

        // var jqlEmptyOrNull = function(jql) {
        //     return (jql === null || jql === '');
        // }

        // var jqlHasDates = function(jql) {
        //     return jql.indexOf('{startDate}') || jql.indexOf('{endDate}');
        // }
        
    }];
});