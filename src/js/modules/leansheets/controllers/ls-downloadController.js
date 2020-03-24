/**
 * The controllers/ directory should only include view-level angular controller definitions.
 * This DOES NOT INCLUDE controllers for use in directives. Keep those inside the directive definition.
 *
 * Naming Convention:
 *
 * 1. Always include `ls-` prefix for namespacing
 * 2. instanceStyleCamelCasing
 * 3. Always include `Controller` suffix
 *
 * i.e. ls-applicationController.js
 */
define(['angular'], function (ng) {
    'use strict';

    /**
     * Returns angular "array-syntax" controller definition.
     *
     * Parameter options include all standard angular services, plus any provided by
     * module-level dependencies.
     */
    return ['$log', '$scope', 'ls-downloadService',
        function ($log, $scope, downloadService ) {

            // var startStatuses = [], stopStatuses = [];
            // $scope.allProjects = [];
            $scope.query = '';
            $scope.queries = [];
            $scope.data = { 
                instanceKey: '',
                saved: { query: 'Saved Queries' },
                start: 'Start Statuses',
                stop: 'Stop Statuses',
                startStatuses: [],
                stopStatuses: []
            };

            $scope.workItems = [];
            $scope.status = { loadingStatus: 0, total: 0, count: 0, error: false, loading: false };

            $scope.$on('loadingStatus:update', function(event, args) {
                $scope.status.total = args.total;
                $scope.status.count = args.count;
                $scope.status.loadingStatus = args.status;
            });

            $scope.totalItemsToLoad = function(query) {
                $log.debug('ls-downloadController: totalItemsToLoad()!');
                $log.debug('ls-downloadController: totalItemsToLoad(query)', query);
                $log.debug('ls-downloadController: $scope.data.instanceKey', $scope.data.instanceKey);
                $log.debug('ls-downloadController: $scope.instancesConfigs', $scope.instancesConfigs);
                $log.debug('ls-downloadController: $scope.instancesConfigs[key]', $scope.instancesConfigs[$scope.data.instanceKey]);
                $scope.status.loading = true;
                downloadService.getNumberOfItemsToLoad($scope.instancesConfigs[$scope.data.instanceKey], query).then(function(success) {
                    $log.debug('ls-downloadController: totalItemsToLoad(query) success!', success);
                    $scope.status.total = success.total;
                    $scope.status.loading = false;
                },function(error) {
                    $log.debug('ls-downloadController: totalItemsToLoad(query) error!', error);
                    $scope.status.error = true;
                });
            };

            $scope.clearAllItems = function() {
                $scope.workItems = [];
            };

            $scope.load = function(query, startAt = 0) {
                $log.debug('ls-downloadController: loading data!');
                $log.debug('ls-downloadController: load(query)', query);
                $log.debug('ls-downloadController: $scope.data.instanceKey', $scope.data.instanceKey);
                $log.debug('ls-downloadController: $scope.instancesConfigs', $scope.instancesConfigs);
                $log.debug('ls-downloadController: $scope.instancesConfigs[key]', $scope.instancesConfigs[$scope.data.instanceKey]);
                $scope.status.loading = true;
                downloadService.getData($scope.instancesConfigs[$scope.data.instanceKey], query, startAt).then(function(success) {
                    $log.debug('ls-downloadController: load(query) success!', success);
                    $scope.status.total = success.length;
                    $scope.status.loading = false;
                    addWorkItems(success);
                },function(error) {
                    $log.debug('ls-downloadController: load(query) error!', error);
                    $scope.status.error = true;
                });

            };

            // TODO: check to see if there's a better way to add arrays to each other
            var addWorkItems = function(workItems) {
                workItems.forEach(item => {
                    $scope.workItems.push(item);
                });
            }

            $scope.$on('downloads:config',
                function(event, configs) {
                    $log.debug('ls-downloadController: Caught "downloads:config" event!');
                    // $scope.allProjects = downloadService.getAllProjects();
            });

            // $scope.startStatuses = function(index) {
            //     $log.debug('ls-downloadController: startStatuses(index))', index);
            // };

            // $scope.stopStatuses = function(index) {
            //     $log.debug('ls-downloadController: stopStatuses(index))', index);
            //     if (!stopStatuses[index]) {
            //         stopStatuses.push()
            //     } else {

            //     }
            // };

            $scope.getQueries = function(key) {
                $log.debug('ls-downloadController: getQueries(key)', key);
                $scope.queries = $scope.instancesConfigs[key].queries;
                $scope.data.instanceKey = key;
            };


            $scope.populateInput = function(query) {
                $log.debug('ls-downloadController: populateInput(query)', query);
                $scope.query = query.value;
                $scope.data.saved.query = query.key;
                // $scope.download.startStatuses = query.leadTimeStartStatuses;
                // $scope.download.stopStatuses = query.leadTimeStopStatuses;
            };

            // get project list from server
            // https://docs.atlassian.com/software/jira/docs/api/REST/7.6.0/#api/2/project

            // ocne having gotten the project need to get the project statuses
            // https://docs.atlassian.com/software/jira/docs/api/REST/7.6.0/#api/2/project-getAllStatuses

        }];
});
