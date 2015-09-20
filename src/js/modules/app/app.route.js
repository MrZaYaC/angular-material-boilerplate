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
          templateUrl: '/view/404.html',
          //controller: '404Controller',
          //controllerAs: 'vm',
          data: {
            title: 'MAIN.BRAND'
          }
        });
  }
})(angular);