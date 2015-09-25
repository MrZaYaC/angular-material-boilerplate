(function (angular) {
  'use strict';
  angular.module('app').directive('loginExist', loginExist);
  loginExist.$inject = ['$q','UserService'];
  function loginExist($q, UserService) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.loginExist = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            return $q.when();
          }
          var def = $q.defer();
          UserService.exist(viewValue).success(function(data){
            if(data.result) {def.reject();} else {def.resolve();}
          }).error(function (error) {
            def.reject();
          });
          return def.promise;
        };
      }
    };
  }
})(angular);