(function () {

  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
      });
    };
  }
  if (!Array.prototype.getIndexBy) {
    Array.prototype.getIndexBy = function (name, value) {
      for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
          return i;
        }
      }
      return -1;
    }
  }
  
  //var data = tv[tv.getIndexBy("id", 2)]
  angular.module('underscore', []);
  angular.module('underscore').factory('_', ['$window', function ($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

  var myModule = angular.module("lomaApp", [
    "underscore",
    "ngRoute",
    "ngSanitize",
    "ui.bootstrap",
    "ngMessages",
    "ui-notification"]);

  function config($routeProvider, $locationProvider, $httpProvider, NotificationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/tmp/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/category-list', {
        templateUrl: '/tmp/category/list.view.html',
        controller: 'categoryCtrl',
        controllerAs: 'vm'
      })
      .when('/question-list', {
        templateUrl: '/tmp/question/list.view.html',
        controller: 'questionCtrl',
        controllerAs: 'vm'
      })
      .when('/exam', {
        templateUrl: '/tmp/exam/index.view.html',
        controller: 'examCtrl',
        controllerAs: 'vm'
      })
      .when('/record-list', {
        templateUrl: '/tmp/record/list.view.html',
        controller: 'recordCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        template: '<h1>hell</h1>'
      })
      .when('/login', {
        template: '<h1>hell</h1>'
      })
      .otherwise({ redirectTo: '/' });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    // Notification global setting
    NotificationProvider.setOptions({
      delay: 3000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
    });
  }

  myModule.value("LOMA_CONFIG", {
    rootUrl: "http://localhost:2000"
  });

  myModule
    .config(['$routeProvider', '$locationProvider', "$httpProvider", 'NotificationProvider', config]);
})();