module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times.
	require('time-grunt')(grunt);

	var httpPort 		= 8081; // default http port
	var livereloadPort	= 35729; // default port livereload listens

	// Define the configuration for all the tasks.
	grunt.initConfig({
		// Connect web server
		connect: {
			options: {
				port: httpPort,
				hostname: 'localhost',
				livereload: livereloadPort
			},
			livereload: {
				options: {
					open: {
						target: 'http://localhost:'+httpPort
					},
					base: [
						'./app' // path to www.root from dir where run
					]
				}
			}
		},
		// Set up watch so that web server started from
		// the connect options (above) will keep the server
		// running and not stop the task bc if the task
		// stops then the sever will stop.
		watch: {
			options: {
				nospawn: true
			},
			livereload: {
				options: {
					livereload: livereloadPort
				},
				files: [
					'app/*.js',
					'app/*.html'
				]
			}
		}
	});

	grunt.registerTask('default', []);

	grunt.registerTask('server',[
			'connect',
			'watch'
		]);
};