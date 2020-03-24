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

    return ['$log', '$q','ls-jiraQueryService',function ($log, $q, jiraQueryService) {

        this.constructService = function(config) {

        };

         /*{
            "self": "http://www.example.com/jira/rest/api/2/project/EX",
            "id": "10000",
            "key": "EX",
            "name": "Example",
            "avatarUrls": {
                "48x48": "http://www.example.com/jira/secure/projectavatar?size=large&pid=10000",
                "24x24": "http://www.example.com/jira/secure/projectavatar?size=small&pid=10000",
                "16x16": "http://www.example.com/jira/secure/projectavatar?size=xsmall&pid=10000",
                "32x32": "http://www.example.com/jira/secure/projectavatar?size=medium&pid=10000"
            },
            "projectCategory": {
                "self": "http://www.example.com/jira/rest/api/2/projectCategory/10000",
                "id": "10000",
                "name": "FIRST",
                "description": "First Project Category"
            }
        }*/
        this.getAllProjects = function() {
            $log.debug('ls-projectService: getAllProjects');
            var deferred = $q.defer(),
                promise = deferred.promise;
                // take a look at issueDownloadService for an example
                // need to use jiraQueryService to make the actual http call
            return promise;
        };

         /*{
            "self": "http://localhost:8090/jira/rest/api/2.0/issueType/3",
            "id": "3",
            "name": "Task",
            "subtask": false,
            "statuses": [
                {
                    "self": "http://localhost:8090/jira/rest/api/2.0/status/10000",
                    "description": "The issue is currently being worked on.",
                    "iconUrl": "http://localhost:8090/jira/images/icons/progress.gif",
                    "name": "In Progress",
                    "id": "10000"
                },
                {
                    "self": "http://localhost:8090/jira/rest/api/2.0/status/5",
                    "description": "The issue is closed.",
                    "iconUrl": "http://localhost:8090/jira/images/icons/closed.gif",
                    "name": "Closed",
                    "id": "5"
                }
            ]
        }*/
        this.getStatuses = function(project) {
            $log.debug('ls-projectService: getStatuses');
            var deferred = $q.defer(),
                promise = deferred.promise;
                // take a look at issueDownloadService for an example
                // need to use jiraQueryService to make the actual http call
            return promise;
        };
       
    }];
});