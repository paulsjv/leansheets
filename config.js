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
    "angular": "github:angular/bower-angular@1.4.6",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.6",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "bootstrap-sass": "github:twbs/bootstrap-sass@3.3.5",
    "core-js": "npm:core-js@1.1.4",
    "font-awesome": "npm:font-awesome@4.4.0",
    "lodash.has": "npm:lodash.has@4.0.0",
    "lodash.isarray": "npm:lodash.isarray@4.0.0",
    "lodash.isempty": "npm:lodash.isempty@4.0.0",
    "lodash.isstring": "npm:lodash.isstring@4.0.0",
    "github:angular/bower-angular-mocks@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
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
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.18"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash.get@4.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.has@4.0.0": {
      "lodash._baseslice": "npm:lodash._baseslice@4.0.0",
      "lodash.get": "npm:lodash.get@4.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.isempty@4.0.0": {
      "lodash.keys": "npm:lodash.keys@4.0.0",
      "lodash.size": "npm:lodash.size@4.0.0"
    },
    "npm:lodash.size@4.0.0": {
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
