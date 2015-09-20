(function (angular) {
  'use strict';
  angular.module('app').directive('password', password);
  password.$inject = ['utils'];
  function password(utils) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.password = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }

          return utils.validatePassword(viewValue);

        };
      }
    };
  }
})(angular);