(function (angular) {
  'use strict';
  angular.module('app').config(signUpRoute);
  signUpRoute.$inject = ['$stateProvider'];

  function signUpRoute($stateProvider) {
    $stateProvider.state('app.signUp', {
      url: '/sign-up',
      templateUrl: '/view/modules/signup/signUp.html',
      controller: 'SignUpController',
      controllerAs: 'signUp',
      data: {
        title: 'MAIN.SIGN_UP',
        isNotLogged: true
      }
    });
  }
})(angular);