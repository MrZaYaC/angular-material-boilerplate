(function (angular) {
  'use strict';
  angular.module('app').config(signInRoute);
  signInRoute.$inject = ['$stateProvider'];

  function signInRoute($stateProvider) {
    $stateProvider.state('app.signIn', {
      url: '/sign-in',
      templateUrl: '/view/modules/signin/signIn.html',
      controller: 'SignInController',
      controllerAs: 'vm',
      data: {
        title: 'MAIN.SIGN_IN',
        isNotLogged: true
      }
    });
  }
})(angular);