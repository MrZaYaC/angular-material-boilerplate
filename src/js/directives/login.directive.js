(function (angular) {
  'use strict';
  angular.module('app').directive('login', login);
  login.$inject = ['utils'];
  function login(utils) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.login = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }

          if(utils.validatePhone(viewValue) || utils.validateEmail(viewValue)){
            return true;
          }
          return false;

        };
      }
    };
  }
})(angular);