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
    "npm:*": "jspm_packages/npm/*",
    "bower:*": "jspm_packages/bower/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.8",
    "angular-animate": "github:angular/bower-angular-animate@1.5.8",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.8",
    "angular-ui-router": "github:angular-ui/ui-router@0.3.1",
    "angularfire": "github:firebase/angularfire@1.2.0",
    "animate.css": "bower:animate.css@3.5.2",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "bootstrap-sass": "github:twbs/bootstrap-sass@3.3.7",
    "core-js": "npm:core-js@1.2.7",
    "d3-array": "npm:d3-array@0.7.1",
    "d3-axis": "npm:d3-axis@0.3.2",
    "d3-collection": "npm:d3-collection@0.1.2",
    "d3-format": "npm:d3-format@0.5.1",
    "d3-scale": "npm:d3-scale@0.6.4",
    "d3-selection": "npm:d3-selection@0.7.3",
    "d3-shape": "npm:d3-shape@0.5.1",
    "d3-svg": "npm:d3-svg@0.2.0",
    "d3-time": "npm:d3-time@0.2.6",
    "d3-transition": "npm:d3-transition@0.2.10",
    "firebase": "github:firebase/firebase-bower@2.4.2",
    "font-awesome": "npm:font-awesome@4.6.3",
    "inflect": "npm:inflect@0.3.0",
    "lodash.find": "npm:lodash.find@4.5.1",
    "lodash.findindex": "npm:lodash.findindex@4.5.1",
    "lodash.has": "npm:lodash.has@4.5.1",
    "lodash.isarray": "npm:lodash.isarray@4.0.0",
    "lodash.isempty": "npm:lodash.isempty@4.3.1",
    "lodash.isstring": "npm:lodash.isstring@4.0.1",
    "lodash.omitby": "npm:lodash.omitby@4.5.1",
    "lodash.range": "npm:lodash.range@3.1.7",
    "lodash.reverse": "npm:lodash.reverse@4.0.1",
    "lodash.slice": "npm:lodash.slice@4.1.0",
    "lodash.sortby": "npm:lodash.sortby@4.6.1",
    "bower:animate.css@3.5.2": {
      "css": "github:systemjs/plugin-css@0.1.26"
    },
    "github:angular/bower-angular-animate@1.5.8": {
      "angular": "github:angular/bower-angular@1.5.8"
    },
    "github:angular/bower-angular-mocks@1.5.8": {
      "angular": "github:angular/bower-angular@1.5.8"
    },
    "github:firebase/angularfire@1.2.0": {
      "angular": "github:angular/bower-angular@1.5.8",
      "firebase": "github:firebase/firebase-bower@2.4.2"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.8"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:d3-axis@0.3.2": {
      "d3-scale": "npm:d3-scale@0.7.2",
      "d3-selection": "npm:d3-selection@0.7.3",
      "d3-transition": "npm:d3-transition@0.2.10"
    },
    "npm:d3-interpolate@0.7.0": {
      "d3-color": "npm:d3-color@0.4.2"
    },
    "npm:d3-interpolate@0.8.3": {
      "d3-color": "npm:d3-color@0.4.2"
    },
    "npm:d3-scale@0.6.4": {
      "d3-array": "npm:d3-array@0.7.1",
      "d3-collection": "npm:d3-collection@0.1.2",
      "d3-color": "npm:d3-color@0.4.2",
      "d3-format": "npm:d3-format@0.5.1",
      "d3-interpolate": "npm:d3-interpolate@0.7.0",
      "d3-time": "npm:d3-time@0.2.6",
      "d3-time-format": "npm:d3-time-format@0.3.2"
    },
    "npm:d3-scale@0.7.2": {
      "d3-array": "npm:d3-array@0.7.1",
      "d3-collection": "npm:d3-collection@0.2.0",
      "d3-color": "npm:d3-color@0.4.2",
      "d3-format": "npm:d3-format@0.5.1",
      "d3-interpolate": "npm:d3-interpolate@0.8.3",
      "d3-time": "npm:d3-time@0.2.6",
      "d3-time-format": "npm:d3-time-format@0.3.2"
    },
    "npm:d3-shape@0.5.1": {
      "d3-path": "npm:d3-path@0.1.5"
    },
    "npm:d3-svg@0.2.0": {
      "d3-selection": "npm:d3-selection@0.6.12"
    },
    "npm:d3-time-format@0.3.2": {
      "d3-time": "npm:d3-time@0.2.6"
    },
    "npm:d3-transition@0.2.10": {
      "d3-color": "npm:d3-color@0.4.2",
      "d3-dispatch": "npm:d3-dispatch@0.4.4",
      "d3-ease": "npm:d3-ease@0.7.0",
      "d3-interpolate": "npm:d3-interpolate@0.8.3",
      "d3-selection": "npm:d3-selection@0.7.3",
      "d3-timer": "npm:d3-timer@0.4.4"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.26"
    },
    "npm:inflect@0.3.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash.find@4.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.findindex@4.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.has@4.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.isempty@4.3.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.omitby@4.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.range@3.1.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.slice@4.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.sortby@4.6.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
