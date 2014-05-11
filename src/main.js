requirejs.config({
  shim: {
    angular: {
      exports: 'angular'
    },
    noteurangle: {
      deps: ['traceur-runtime']
    }
  },
  paths: {
    angular: 'lib/angular/angular',
    'traceur-runtime': 'lib/traceur-runtime/traceur-runtime'
  }
});

requirejs(['angular', 'noteurangle'], function (angular) {
  'use strict';
  angular.element(document).ready(function () {
    angular.bootstrap(document, ['noteurangle']);
  });
});
