(function (angular) {
  'use strict';
  angular.module('app').config(appRoute);
  appRoute.$inject = ['$stateProvider'];

  function appRoute($stateProvider) {
    $stateProvider.state('app', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        user: ['User', function(User) {
          return User.me();
        }]
      }
    });
    $stateProvider.state('app.404', {
          url: '/404',
          templateUrl: '/view/main/404.html',
          data: {
            title: 'MAIN.BRAND'
          }
        });
  }
})(angular);