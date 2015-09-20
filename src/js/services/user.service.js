(function (angular) {
  'use strict';
  angular.module('app').factory('UserService', UserService);

  UserService.$inject = ['$http', 'appSettings'];
  function UserService($http, appSettings) {
    var apiUrl = appSettings.API.HOST + '/users';
    var service = {
      me: me,
      exist: exist
    };
    return service;

    function me() {
      return $http.get(apiUrl+'/me');
    }
    function exist(login){
      return $http.get(apiUrl+'/exist?username='+encodeURIComponent(login));
    }
  }
})(angular);