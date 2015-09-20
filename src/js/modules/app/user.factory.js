(function (angular) {
  "use strict";
  angular.module('app').factory('User', User);
  User.$inject = ['UserService', 'AuthService', '$window', '$http', '$q', '$state'];
  function User (UserService, AuthService, $window, $http, $q, $state) {
    var user = {
      isLogged: false,
      data: {},
      me: me,
      logout: logout
    };
    return user;

    function me(token) {
      var def = $q.defer();
      token = token || $window.localStorage.token || false;
      if(token){
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        UserService.me().success(function (data) {
          user.isLogged = true;
          user.data = data;
          def.resolve(data);
        }).error(function (error) {
          def.reject(error);
        });
        return def.promise;
      } else {
        return false;
      }

    }
    function logout() {
      AuthService.logout().success(function(answer){
        delete $window.localStorage.token;
        $http.defaults.headers.common.Authorization = null;
        user.isLogged = false;
        user.data = {};
        $state.go('app.home');
      });
    }

  }
})(angular);