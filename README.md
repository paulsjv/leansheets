LeanSheets
==========

Installing & Running
-------------------------
The 2.0 branch of LeanSheets is a development branch.  While we do our best to make sure the branch is always working that may not be the case.  If you would like to install and run LeanSheets 2.0 please feel free to do the following steps.

Below taken partly from:
https://raw.githubusercontent.com/tniswong/web-build/master/README.md

# Web-Build Project Template

Key Features: 

- Gulp
- ES6 (JSPM/Babel)
- Sass
- Karma + PhantomJS + Jasmine + ES6
- Coverage Reports (Istanbul)
- Complexity Reports (Plato)
- Angular
- ng-annotate
- Cached templates
- Protractor + Jasmine
- LiveReload
- 100% Stream-based in-memory compilation and development previews

## Known Issues
 
- `gulp preview` command performance will decay after several consecutive `watch` compilations. Kill the `preview` task 
and re-run it to temporarily reduce the build time.

## Getting Started

I Recommend that you use npm v3.5+

Run once per machine to install `jspm` and `gulp` (if not installed already):

- `npm install -g jspm`
- `npm install -g gulp`

Install `npm` and `jspm` dependencies.

- `npm install`

Note: `jspm` dependencies are automatically installed via a `postinstall` script hook configured in `package.json`

## Convention > Configuration

- `build/project.conf.js`
   
  Stores relevant project configuration, take a look. Don't change it if you don't have to, it's a convention.

## Gulp tasks you care about

- `default`
 
  Lints JS, Executes unit tests, generates coverage and complexity reports, bundles Sass and Javascript, converts
  images to webp and replaces all references appropriately, serves up a preview from memory with sourcemaps
  and LiveReload enabled at [http://localhost:3000](http://localhost:3000/), and auto-opens Chrome by default.
   
  This task is an alias for the `preview` task.

- `dist`
 
  Executes unit tests, generates coverage and complexity reports, bundles and minifies Sass and Javascript, converts 
  images to webp and replaces all references as appropriate, appends a sha hash revision to all filenames and replaces
  all references as appropriate, and copies the result to the dist directory.
  
- `preview`
 
  Serves up a preview from memory with LiveReload enabled at [http://localhost:3000](http://localhost:3000/), and
  auto-opens Chrome by default.
  
- `preview:dist`
   
  Executes `dist` and serves up a preview from memory at [http://localhost:3000](http://localhost:3000/) and auto-opens
  Chrome by default.
  
- `test:unit`
  Executes the unit tests and generates a coverage report.

- `test:functional`
  Executes the functional tests.

## Reports

Reports are located by default under `build/reports`. This location can be modified by modifying `build/project.conf.js`.

## Sources

Sources are located by default under `www/`. This location can be modified by modifying `build/project.conf.js`.

## Specs

Specs are located by default under `spec/`. This location can be modified by modifying `build/project.conf.js`.
Both Unit and Functional tests are supported. Unit tests are run via Karma + PhantomJS. Functional tests are run via
Protractor + Chrome. Both types of specs support ES6

## Installing UI Packages

- `jspm install angular`

No need for `--save` or `--save-dev`. This will install a package that can be included in your source by adding an ES6 
import such as: `import angular from 'angular';` to any file. For packages that must be included "first", add the import
statement to `modules/main/main.js`
