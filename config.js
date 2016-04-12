System.config({
  baseURL: "",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.3",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.3",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
    "angularfire": "github:firebase/angularfire@1.2.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "bootstrap-sass": "github:twbs/bootstrap-sass@3.3.6",
    "core-js": "npm:core-js@1.2.6",
    "d3-array": "npm:d3-array@0.7.1",
    "d3-axis": "npm:d3-axis@0.3.0",
    "d3-collection": "npm:d3-collection@0.1.2",
    "d3-format": "npm:d3-format@0.5.1",
    "d3-scale": "npm:d3-scale@0.6.4",
    "d3-selection": "npm:d3-selection@0.7.0",
    "d3-shape": "npm:d3-shape@0.5.1",
    "d3-svg": "npm:d3-svg@0.2.0",
    "d3-time": "npm:d3-time@0.2.5",
    "firebase": "github:firebase/firebase-bower@2.4.2",
    "font-awesome": "npm:font-awesome@4.5.0",
    "lodash.find": "npm:lodash.find@4.2.0",
    "lodash.findindex": "npm:lodash.findindex@4.2.0",
    "lodash.has": "npm:lodash.has@4.2.1",
    "lodash.isarray": "npm:lodash.isarray@4.0.0",
    "lodash.isempty": "npm:lodash.isempty@4.1.3",
    "lodash.isstring": "npm:lodash.isstring@4.0.1",
    "github:angular-ui/ui-router@0.2.18": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:angular/bower-angular-mocks@1.5.3": {
      "angular": "github:angular/bower-angular@1.5.3"
    },
    "github:firebase/angularfire@1.2.0": {
      "angular": "github:angular/bower-angular@1.5.3",
      "firebase": "github:firebase/firebase-bower@2.4.2"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:d3-axis@0.3.0": {
      "d3-scale": "npm:d3-scale@0.6.4",
      "d3-selection": "npm:d3-selection@0.7.0",
      "d3-transition": "npm:d3-transition@0.2.8"
    },
    "npm:d3-interpolate@0.7.0": {
      "d3-color": "npm:d3-color@0.4.2"
    },
    "npm:d3-scale@0.6.4": {
      "d3-array": "npm:d3-array@0.7.1",
      "d3-collection": "npm:d3-collection@0.1.2",
      "d3-color": "npm:d3-color@0.4.2",
      "d3-format": "npm:d3-format@0.5.1",
      "d3-interpolate": "npm:d3-interpolate@0.7.0",
      "d3-time": "npm:d3-time@0.2.5",
      "d3-time-format": "npm:d3-time-format@0.3.1"
    },
    "npm:d3-shape@0.5.1": {
      "d3-path": "npm:d3-path@0.1.5"
    },
    "npm:d3-svg@0.2.0": {
      "d3-selection": "npm:d3-selection@0.6.12"
    },
    "npm:d3-time-format@0.3.1": {
      "d3-time": "npm:d3-time@0.2.5"
    },
    "npm:d3-transition@0.2.8": {
      "d3-color": "npm:d3-color@0.4.2",
      "d3-dispatch": "npm:d3-dispatch@0.4.3",
      "d3-ease": "npm:d3-ease@0.7.0",
      "d3-interpolate": "npm:d3-interpolate@0.7.0",
      "d3-selection": "npm:d3-selection@0.7.0",
      "d3-timer": "npm:d3-timer@0.4.1"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash._baseiteratee@4.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.find@4.2.0": {
      "lodash._baseeach": "npm:lodash._baseeach@4.1.1",
      "lodash._basefind": "npm:lodash._basefind@3.0.0",
      "lodash._basefindindex": "npm:lodash._basefindindex@3.6.0",
      "lodash._baseiteratee": "npm:lodash._baseiteratee@4.5.2"
    },
    "npm:lodash.findindex@4.2.0": {
      "lodash._basefindindex": "npm:lodash._basefindindex@3.6.0",
      "lodash._baseiteratee": "npm:lodash._baseiteratee@4.5.2"
    },
    "npm:lodash.has@4.2.1": {
      "lodash._baseslice": "npm:lodash._baseslice@4.0.0",
      "lodash.tostring": "npm:lodash.tostring@4.1.2"
    },
    "npm:lodash.tostring@4.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
