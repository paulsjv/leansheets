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

    return ['$log','$http','$q','ls-issueService','ls-sprintIssuesService','ls-sprintBoundariesService','$unionBy', 'ls-cacheService',
            function ($log, $http, $q, issueService, sprintIssuesService, sprintBoundariesService, $unionBy, cacheService) {

/**
         * sheetKey is passed in via the getConfig method.  The getConfig method is called
         * any time the typeService gets the workTypes from a specific sheet.  The sheetKey
         * member variable is saved when the getConfig is called so that the rest of the
         * class can use it to pass as part of the cache key and to get the sheet URL.
         * @member {string}
         */
        var sheetKey,
            dsConfig;

        this.constructService = function(sheet, config, datePickerFormat) {
            sheetKey = sheet;
            dsConfig = config.dataUrl;
            issueService.constructService(config, datePickerFormat);
            sprintIssuesService.constructService(config, config.dataUrl.sprints.config.issues, datePickerFormat);
            sprintBoundariesService.constructService(config, config.dataUrl.sprints.config.boundaries, datePickerFormat);
        };

        this.getConfig = function(sheet) {
            sheetKey = sheet;
            var deferred = $q.defer(),
                promise = deferred.promise,
                // configQuery = queryService.getConfigQuery(),
                // cachedData = cacheService.get(configQuery + sheetKey),
                handleResponse = function(response) {
                    var data = setDataOnPromise(response, deferred);
                    // cacheService.put(configQuery + sheetKey, data);
                },
                query;

            $log.debug('Query for Config');
            // $log.debug(configQuery);
            if (cachedData === undefined) {
                // $log.debug('ls-jiraService: there was no cached config', configQuery);
                $log.debug('*************** Calling JIRA Over the Wire ***************');
                // query = new $google.visualization.Query(configService.getConfigUrl(sheetKey));
                // query.setQuery(configQuery);
                // query.send(handleResponse);
            } else {
                // $log.debug('ls-jiraService: resolving with cached data', cachedData);
                // deferred.resolve(cachedData);
            }

            return promise;
        };

        /**
         * 1. Get all items by end date (resolved some might not use resolved date)
         *      1.1 Get all subtasks of issue type = Story
         * 2. Get all sprints from done date
         * 3. Adjust start date of issue by what sprint issue was a part of
         * 4. Done date could be sprint end or resolve date of issue
         */
		this.getData = function(types) {
            $log.debug('ls-jiraService: getData');
			var deferred = $q.defer(),
			    promise = deferred.promise,
                // dataQuery = queryService.getDataQuery(types),
                // cachedData = cacheService.get(types.startDate + types.endDate + sheetKey),
    			handleResponse = function(response) {
	    			var data = setDataOnPromise(response, deferred);
                    // cacheService.put(dataQuery + sheetKey, data);
		    	},
                query;

            $log.debug('Query for Run Chart & Histogram');
            // $log.debug(dataQuery);
            var cachedData;
            if (cachedData === undefined) {
                // $log.debug('ls-jiraService: there was no cached data', dataQuery);
                $log.debug('*************** Calling JIRA Over the Wire ***************');
                // 1. is sprint model being used?
                // 2. get all sprints from start date
                // 3. get all items from start date
                // 4. get all subtasks if issue is a story
                // 5. if using sprint model adjust item start dates to align with sprint start dates
                // 6. items that are started outside a sprint use issues start date instead of sprint start date

                // If the user is using sprints then need to check if they are also wanting to use the
                // sprint start date or sprint end date to change the issues that come back and each of their 
                // start / end dates to align with the sprint for Lead Time.  If sprints are used and neither 
                // sprint start date or end date is being used then issues can be retreived without changing 
                // their start date or end date.
                var csvIssuses, issuesPromise, sprintPromise;
                if (sprintBoundariesService.isSprint()) {
                    // get all sprints from start date from sprintService
                    $log.debug('Using Sprints');
                    // returns a promise need to also call to get all the issues
                    // once both have returned then go through and change the 
                    // start dates of the all the items to their corrosponding sprint
                    // start date.  Make sure to return a CSV of the results
                    // key,summary,startdate,enddate,leadtime,issuetype,points,parent,linked1:linked2:linked3,label1:label2:label3
                    sprintBoundariesService.getAllSprints(types.startDate, types.endDate)
                        .then(function(success) {
                            $log.debug('ls-jiraService: getAllSprints Success:', success);
                            getSprintIssues(success);
                        },function(error) {
                            $log.debug('ls-jiraService: getAllSprints Error:', error);
                            deferred.reject(error);
                        });

                    var sprintIssuesPromises = [];
                    var getSprintIssues = function(sprints) {
                        sprints.forEach(function(sprint) {
                            sprintIssuesPromises.push(sprintIssuesService.getSprintIssues(sprint));
                        });

                        $q.all(sprintIssuesPromises)
                            .then(function(success){
                                $log.debug('ls-jiraService: getSprintIssues Success:', success);
                                // if an issue is started in a sprint and carried then need to save that
                                // sprint start date - maybe this is how it works with the issue.commitDate?
                                // maybe use the issue.key when issues are retruned from the server to make sure
                                // to get the correct sprint start date when the issue first appears in a sprint?
                                // Issue may have been started before added to a sprint.  Need to check the dates
                                // in the changelog.histories array in what is returned
                                // Also, could use the changelog.histories to place issues into the correct sprint
                                var issues = $unionBy(success.flat(), 'key');
                                // set cache
                                issues = sprintIssuesService.getSprintIssuesAsCsv(issues);
                                deferred.resolve(issues);
                            },function(error){
                                $log.debug('ls-jiraService: getSprintIssues Error:', error);
                                deferred.reject(error);
                            });
                    };

                } else {
                    // not using sprints and just get the issues to return
                    issuePromise = issueService.getAllIssues(types.startDate, types.endDate)
                        .then(function(success) {
                            $log.debug('ls-jiraService: getAllIssues Success:', success);
                            csvIssuses = issueService.getIssuesAsCsv(success);
                            deferred.resolve(csvIssuses);
                        },function(error) {
                            $log.debug('ls-jiraService: getAllIssues Error:', error);
                            deferred.reject(error);
                        });
                }           
            } else {
                // $log.debug('ls-jiraService: resolving with cached data', cachedData);
                // deferred.resolve(cachedData);
            }

			return promise;
		};

		// this.getCfdStartData = function(types) {
		// 	var deferred = $q.defer(),
		// 	    promise = deferred.promise,
        //         dataQuery = queryService.getCfdStartQuery(types),
        //         cachedData = cacheService.get(dataQuery + sheetKey),
        //         handleResponse = function(response) {
		// 		    var data = setDataOnPromise(response, deferred);
        //             cacheService.put(dataQuery + sheetKey, data);
		// 	    },
        //         query;

        //     $log.debug('Query for start dates CFD Chart');
        //     $log.debug(dataQuery);
        //     if (cachedData === undefined) {
        //         $log.debug('ls-jiraService: there was no cached data', dataQuery);
        //         $log.debug('*************** Calling Google Over the Wire ***************');
        //         query = new google.visualization.Query(configService.getDataUrl(sheetKey))
		// 	    query.setQuery(dataQuery);
		// 	    query.send(handleResponse);
        //     } else {
        //         $log.debug('ls-jiraService: resolving with cached data', dataQuery);
        //         deferred.resolve(cachedData);
        //     }

		// 	return promise;
		// };

		// this.getCfdEndData = function(types) {
		// 	var deferred = $q.defer(),
		// 	    promise = deferred.promise,
        //         dataQuery = queryService.getCfdEndQuery(types),
        //         cachedData = cacheService.get(dataQuery + sheetKey),
        //         handleResponse = function(response) {
		// 		    var data = setDataOnPromise(response, deferred);
        //             cacheService.put(dataQuery + sheetKey, data);
		// 	    },
        //         query;

        //     $log.debug('Query for end dates CFD Chart');
        //     $log.debug(dataQuery);
        //     if (cachedData === undefined) {
        //         $log.debug('ls-jiraService: there was no cached data', dataQuery);
        //         $log.debug('*************** Calling Google Over the Wire ***************');
        //         query = new google.visualization.Query(configService.getDataUrl(sheetKey)),
    	// 		query.setQuery(dataQuery);
    	// 		query.send(handleResponse);
        //     } else {
        //         $log.debug('ls-jiraService: resolving with cached data', dataQuery);
        //         deferred.resolve(cachedData);
        //     }
		// 	return promise;
        // };

		var isResponseError = function (response) {
	       	if (response.isError()) {
	          	return true;
	       	}
	       	return false;
	    };
	    var setDataOnPromise = function(response, deferred) {
	    	if (isResponseError(response)) {
                    $log.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
					deferred.reject('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    return undefined;
            }
			var dataTable = response.getDataTable();
			var csvData = $google.visualization.dataTableToCsv(dataTable);

            if (!csvData) {
				$log.debug('ls-jiraService: No data for date range and work type(s) selected');
                deferred.reject({
                    errorcode : '1',
                    message : 'ls-jiraService: No data for date range and work type(s)'
                });
                return undefined;
            } else {
                deferred.resolve(csvData);
                return csvData;
            }
	    };
        // TODO:
    //     var configUrl = configService.getDataUrl(sheetKey);
    //     var encodedParam = encodeURIComponent(configUrl.split('?url=')[1]);
    //     console.log(encodedParam);
    //     $http({
    //         url: configUrl, 
    //         method: 'GET',
    //         params: { encodedUrl: encodedParam }
    //     }).success(function() {
    //         $log.debug('Success in calling for Config');
    //     })
    //     .error(function(){
    //         $log.debug('Error in calling for Config');
    //     });
    // } else {
    //     $log.debug('ls-jiraService: resolving with cached data', cachedData);
    //     deferred.resolve(cachedData);
    // }
    }];
});