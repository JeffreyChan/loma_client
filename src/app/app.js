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
        templateUrl: '/tmp/category/category.view.html',
        controller: 'categoryCtrl',
        controllerAs: 'vm'
      })
      .when('/sya', {
        template: '<h1>hell</h1>'
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

  myModule
    .config(['$routeProvider', '$locationProvider', "$httpProvider", 'NotificationProvider', config]);
})();