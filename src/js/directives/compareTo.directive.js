(function (angular) {
  angular.module('app').directive('compareTo', compareTo);
  function compareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.compareTo = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(viewValue)) {
            return true;
          }
          ctrl.$validators.compareTo = function(modelValue, viewValue) {
            return viewValue == scope.otherModelValue;
          };

          scope.$watch("otherModelValue", function() {
            ctrl.$validate();
          });
        };
      }
    };
  }
})(angular);