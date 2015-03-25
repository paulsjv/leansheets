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
        highcharts: '../bower_components/highcharts/highcharts',
        highchartsng: '../bower_components/highcharts-ng/dist/highcharts-ng',
        jssha: '../bower_components/jssha/src/sha256'
    },

    shim: {
        jquery: {
            exports: 'jquery',
            deps: ['ie-console-poly']
        },
        bootstrap: {
            deps: ['jquery']
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
        }
    }

});
