(function (angular) {
  'use strict';
  angular.module('app').config(homeRoute);
  homeRoute.$inject = ['$stateProvider'];

  function homeRoute($stateProvider) {
    $stateProvider.state('app.home', {
      url: '/',
      templateUrl: '/view/modules/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
      data: {
        title: 'MAIN.BRAND'
      }
    });
  }
})(angular);