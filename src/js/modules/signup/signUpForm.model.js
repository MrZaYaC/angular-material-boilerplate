(function (angular) {
  'use strict';
  angular.module('app').factory('signUpFormModel', signUpFormModel);
  signUpFormModel.$inject = ['AuthService', 'User', '$window', '$q'];
  function signUpFormModel(AuthService, User, $window, $q) {
    var form = {
      login: '',
      password: '',
      confirmPassword: '',
      signUp: signUp
    };
    return form;

    function signUp() {
      var def = $q.defer();
      AuthService.signUp(form.login, form.password).success(function (data) {
        $window.localStorage.token = data.token;
        User.me(data.token).then(function(){
          def.resolve();
        });
      }).error(function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }
})(angular);