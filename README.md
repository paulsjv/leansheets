# Web-Build Project Template

Key Features: 

- Gulp
- ES6 (JSPM/Babel)
- Sass
- Karma + PhantomJS + Jasmine + ES6
- Coverage Reports (Istanbul)
- Complexity Reports (Plato)
- Angular
- Protractor + Jasmine
- LiveReload

## Getting Started

Run once per machine to install `jspm` and `gulp` (if not installed already):

- `npm install -g jspm`
- `npm install -g gulp`

Install `npm` and `jspm` dependencies.

- `npm install && jspm install`

Note: If you run into the following error, you may need to adjsut your ulimit settings.

> Error: EMFILE, too many open files
 
To adjust your ulimit (on Macs):

- `ulimit -n 2560`

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
 
  Executes unit tests, generates coverage and complexity reports, bundles Sass and Javascript, converts images to webp
  and replaces all references appropriately, appends a sha hash revision to all filenames and replaces all references
  appropriately, and copies the result to the dist directory.
  
- `preview`
 
  Serves up a preview from memory with LiveReload enabled at [http://localhost:3000](http://localhost:3000/), 
  and auto-opens Chrome by default.
  
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
