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

  packages: {
    "https://www.google.com/": {
      "defaultExtension": false
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.9",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.9",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "bootstrap-sass": "github:twbs/bootstrap-sass@3.3.5",
    "core-js": "npm:core-js@1.1.4",
    "d3-array": "npm:d3-array@0.7.1",
    "d3-axis": "npm:d3-axis@0.3.0",
    "d3-format": "npm:d3-format@0.5.1",
    "d3-scale": "npm:d3-scale@0.6.4",
    "d3-selection": "npm:d3-selection@0.7.0",
    "d3-shape": "npm:d3-shape@0.5.1",
    "d3-svg": "npm:d3-svg@0.2.0",
    "d3-time": "npm:d3-time@0.2.5",
    "font-awesome": "npm:font-awesome@4.4.0",
    "lodash.find": "npm:lodash.find@4.0.1",
    "lodash.findindex": "npm:lodash.findindex@4.0.1",
    "lodash.has": "npm:lodash.has@4.0.1",
    "lodash.isarray": "npm:lodash.isarray@4.0.0",
    "lodash.isempty": "npm:lodash.isempty@4.0.0",
    "lodash.isstring": "npm:lodash.isstring@4.0.0",
    "github:angular/bower-angular-mocks@1.4.9": {
      "angular": "github:angular/bower-angular@1.4.9"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:d3-axis@0.3.0": {
      "d3-scale": "npm:d3-scale@0.6.4",
      "d3-selection": "npm:d3-selection@0.7.0",
      "d3-transition": "npm:d3-transition@0.2.7"
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
    "npm:d3-transition@0.2.7": {
      "d3-color": "npm:d3-color@0.4.2",
      "d3-dispatch": "npm:d3-dispatch@0.4.3",
      "d3-ease": "npm:d3-ease@0.7.0",
      "d3-interpolate": "npm:d3-interpolate@0.7.0",
      "d3-selection": "npm:d3-selection@0.7.0",
      "d3-timer": "npm:d3-timer@0.4.1"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.18"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash._baseeach@4.0.0": {
      "lodash.keys": "npm:lodash.keys@4.0.0"
    },
    "npm:lodash._baseisequal@4.0.2": {
      "lodash._stack": "npm:lodash._stack@4.0.1",
      "lodash.keys": "npm:lodash.keys@4.0.0"
    },
    "npm:lodash._baseismatch@4.0.2": {
      "lodash._baseisequal": "npm:lodash._baseisequal@4.0.2",
      "lodash._stack": "npm:lodash._stack@4.0.1"
    },
    "npm:lodash._stack@4.0.1": {
      "lodash._mapcache": "npm:lodash._mapcache@4.0.0"
    },
    "npm:lodash.find@4.0.1": {
      "lodash._baseeach": "npm:lodash._baseeach@4.0.0",
      "lodash._basefind": "npm:lodash._basefind@3.0.0",
      "lodash._basefindindex": "npm:lodash._basefindindex@3.6.0",
      "lodash._baseisequal": "npm:lodash._baseisequal@4.0.2",
      "lodash._baseismatch": "npm:lodash._baseismatch@4.0.2",
      "lodash.get": "npm:lodash.get@4.0.1",
      "lodash.hasin": "npm:lodash.hasin@4.0.1",
      "lodash.topairs": "npm:lodash.topairs@4.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.findindex@4.0.1": {
      "lodash._basefindindex": "npm:lodash._basefindindex@3.6.0",
      "lodash._baseisequal": "npm:lodash._baseisequal@4.0.2",
      "lodash._baseismatch": "npm:lodash._baseismatch@4.0.2",
      "lodash.get": "npm:lodash.get@4.0.1",
      "lodash.hasin": "npm:lodash.hasin@4.0.1",
      "lodash.topairs": "npm:lodash.topairs@4.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.get@4.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.has@4.0.1": {
      "lodash._baseslice": "npm:lodash._baseslice@4.0.0",
      "lodash.get": "npm:lodash.get@4.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.hasin@4.0.1": {
      "lodash._baseslice": "npm:lodash._baseslice@4.0.0",
      "lodash.get": "npm:lodash.get@4.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.isempty@4.0.0": {
      "lodash.keys": "npm:lodash.keys@4.0.0",
      "lodash.size": "npm:lodash.size@4.0.1"
    },
    "npm:lodash.size@4.0.1": {
      "lodash.keys": "npm:lodash.keys@4.0.0"
    },
    "npm:lodash.topairs@4.0.0": {
      "lodash._arraymap": "npm:lodash._arraymap@3.0.0",
      "lodash.keys": "npm:lodash.keys@4.0.0"
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
