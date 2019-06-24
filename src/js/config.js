require.config({
    waitSeconds: 15,
    paths: {
        async: '../bower_components/requirejs-plugins/src/async',
        goog: '../bower_components/requirejs-plugins/src/goog',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        'ie-console-poly': '../lib/ie-console-poly',
        angular: '../bower_components/angularjs/angular',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../bower_components/jquery/dist/jquery',
        moment: '../bower_components/moment/moment',
        'moment-business-days': '../bower_components/moment-business-days/index',
        highcharts: '../bower_components/highcharts/highcharts',
        highchartsng: '../bower_components/highcharts-ng/dist/highcharts-ng',
        jssha: '../bower_components/jssha/src/sha256',
        'bootstrap-datepicker': '../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker',
        'lodash.unionby': '../bower_components/lodash.unionby/index'
    },

    shim: {
        jquery: {
            exports: 'jquery',
            deps: ['ie-console-poly']
        },
        bootstrap: {
            exports: 'bootstrap',
            deps: ['jquery']
        },
        'bootstrap-datepicker': {
            exports: 'bootstrap-datepicker'
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        highcharts: {
            exports: 'highcharts',
            deps: ['angular']
        },
        highchartsng: {
            exports: 'highchartsng',
            deps: ['angular']
        },
        moment: {
            exports: 'moment'
        },
        'moment-business-days': {
            exports: 'moment',
            deps: ['moment']
        },
        jssha: {
            exports: 'jssha'
        },
        'lodash.unionby': {
            exports: 'unionBy'
        }

    }

});
