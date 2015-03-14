module.exports = function(grunt) {
    'use strict';
    
    var httpPort = 8081,
        locations = {

            // Destination directory for compiled output. Relative to Gruntfile.js.
            // dest: 'dist',

            // Temporary work directory. Relative to Gruntfile.js.
            // work: 'target',

            // Raw sources root. Assumes child folder /js Relative to Gruntfile.js.
            srcRoot: 'src',

            // JS test root. Assumes child folder /js Relative to Gruntfile.js.
            // testRoot: 'test',

            // Bower root. Relative to Gruntfile.js.
            bowerRoot: grunt.file.readJSON('.bowerrc').directory

        };
        
	// Define the configuration for all the tasks.
	grunt.initConfig({
        locations: locations,
        httpPort: httpPort,
        connect: {
            dev: {
                options: {
                    port: '<%= httpPort %>',
                    protocol: 'http',
                    hostname: '*',
                    base: '<%= locations.srcRoot %>',
                    keepalive: true,
                    open: false,
                    useAvailablePort: true
                    // middleware: function(connect, options, middlewares) {
                    //    middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                    //    return middlewares;
                    }
                }
            }
	    });

    require('load-grunt-tasks')(grunt, { pattern: ['grunt-*'] }); //, '!grunt-template-*'] });
	
    grunt.registerTask('run', [ 'connect' ]);
};