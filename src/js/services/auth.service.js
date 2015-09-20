(function (angular) {
  'use strict';
  angular.module('app').factory('AuthService', AuthService);

  AuthService.$inject = ['$http', 'appSettings'];
  function AuthService($http, appSettings) {
    var apiUrl = appSettings.API.HOST + '/auth';
    var ip = null;
    ipLookup();
    return {
      signUp: signUp,
      signIn: signIn,
      logout: logout,
      facebook: facebook,
      google: google
    };

    function signUp(username, password) {
      return $http.post(apiUrl, {
        username: username,
        password: password,
        ip: ip
      });
    }
    function signIn(username, password){
      return $http.get(apiUrl + '?username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password));
    }
    function logout(){
      return $http.delete(apiUrl);
    }
    function facebook(accessToken) {
      return $http.get(apiUrl + '/facebook' + '?access_token=' + accessToken + (ip ? '&ip=' +  encodeURIComponent(ip) : ''));
    }
    function google(accessToken) {
      return $http.get(apiUrl + '/google' + '?access_token=' + accessToken + (ip ? '&ip=' +  encodeURIComponent(ip) : ''));
    }
    function ipLookup() {
      $http.get('http://ipinfo.io/json').success(function (data) {
        ip = data.ip;
      });
    }
  }
})(angular);