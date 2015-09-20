(function (angular) {
  'use strict';
  angular.module('app').config(profileRoute);
  profileRoute.$inject = ['$stateProvider'];

  function profileRoute($stateProvider) {
    $stateProvider.state('app.profile', {
      url: '/profile',
      templateUrl: '/view/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm',
      data: {
        title: 'MAIN.PROFILE',
        isLogged: true
      }
    });
  }
})(angular);