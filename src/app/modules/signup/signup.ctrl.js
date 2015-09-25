(function (angular) {
  'use strict';
  angular.module('app').controller('SignUpController', SignUpController);

  SignUpController.$inject = ['signUpFormModel', '$state', '$mdToast', '$filter'];
  function SignUpController(signUpFormModel, $state, $mdToast, $filter) {
    var vm = this;

    vm.user = signUpFormModel;
    vm.signUp = signUp;
    vm.signUpForm = '';

    function signUp() {
      if(vm.signUpForm.$valid){
        signUpFormModel.signUp().then(function() {
          $state.go('app.profile');
        }, function (error) {
          $mdToast.show($mdToast.simple().content(($filter('translate')('MESSAGES.DEFAULT')))
              .theme('error-toast')
              .position('top right'));
        });
      }
    }
  }
})(angular);