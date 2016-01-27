(function (angular) {
  'use strict';
  angular.module('app').controller('SignInController', SignInController);

  SignInController.$inject = ['$scope', 'signInFormModel', '$state', '$mdToast', '$filter'];
  function SignInController($scope, signInFormModel, $state, $mdToast, $filter) {
    var vm = this;

    vm.user = signInFormModel;
    vm.signIn = signIn;
    vm.facebook = facebook;
    vm.google = google;
    vm.form = '';


    function signIn() {
      vm.error = false;
      if(vm.form.$valid) {
        signInFormModel.signIn().then(function() {
          success();
        }, function (error) {
          $mdToast.show($mdToast.simple().content(($filter('translate')('MESSAGES.INVALID_CREDENTIALS')))
              .theme('error-toast')
              .position('top right'));
        });

      }
    }
    function facebook(){
      signInFormModel.facebook().then(function() {
        success();
      }, function (error) {
        $mdToast.show($mdToast.simple().content(($filter('translate')('MESSAGES.INVALID_CREDENTIALS')))
            .theme('error-toast')
            .position('top right'));
      });
    }
    function google(){
      signInFormModel.google().then(function() {
        success();
      }, function (error) {
        $mdToast.show($mdToast.simple().content(($filter('translate')('MESSAGES.INVALID_CREDENTIALS')))
            .theme('error-toast')
            .position('top right'));
      });
    }

    function success(){
      if($scope.redirect){
        $state.go($scope.redirect);
        $scope.redirect = false;
      } else {
        $state.go('app.home');
      }
    }
  }
})(angular);