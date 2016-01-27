(function (angular) {
  'use strict';
  angular.module('app').config(profileRoute);
  profileRoute.$inject = ['$stateProvider'];

  function profileRoute($stateProvider) {
    $stateProvider.state('app.profile', {
      url: '/profile',
      templateUrl: '/view/modules/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile',
      data: {
        title: 'MAIN.PROFILE',
        isLogged: true
      }
    });
  }
})(angular);