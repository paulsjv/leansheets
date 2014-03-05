module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/jquery-1.10.2/jquery-1.10.2.min.js',
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'app/lib/moment-2.5.1/moment.min.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js',
      'app/js/google-sheets.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
