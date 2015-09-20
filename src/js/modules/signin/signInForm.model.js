(function (angular) {
  'use strict';
  angular.module('app').factory('signInFormModel', signInFormModel);
  signInFormModel.$inject = ['AuthService', 'User', '$window', '$q', 'Facebook', 'GooglePlus'];
  function signInFormModel(AuthService, User, $window, $q, Facebook, GooglePlus) {
    var fbLoginStatus = '';
    var fbAccessToken = '';
    var form = {
      login: '',
      password: '',
      rememberMe: true,
      signIn: signIn,
      facebook: facebook,
      google: google
    };
    Facebook.getLoginStatus(function(response) {
      fbLoginStatus = response.status;
      if(fbLoginStatus == 'connected')
        fbAccessToken = response.authResponse.accessToken;
    });
    return form;

    function signIn() {
      var def = $q.defer();
      AuthService.signIn(form.login, form.password).success(function (data) {
        if(form.rememberMe){
          $window.localStorage.token = data.token;
        }
        User.me(data.token).then(function(){
          def.resolve();
        });
      }).error(function(data){
        def.reject(data);
      });
      return def.promise;
    }
    function facebook() {
      var def = $q.defer();
      if(fbLoginStatus == 'connected'){
        AuthService.facebook(fbAccessToken).success(function (data) {
          $window.localStorage.token = data.token;
          User.me(data.token).then(function(){
            def.resolve();
          });
        }).error(function (err) {
          def.reject(err);
        });
      } else {
        Facebook.login(function (response) {
          AuthService.facebook(response.authResponse.accessToken).success(function (data) {
            $window.localStorage.token = data.token;
            User.me(data.token).then(function(){
              def.resolve();
            });
          }).error(function (err) {
            def.reject(err);
          });
        }, {scope: 'email, public_profile'});
      }
      return def.promise;
    }
    function google() {
      var def = $q.defer();
      GooglePlus.login().then(function (authResult) {
        if(authResult.access_token){
          AuthService.google(authResult.access_token).success(function (data) {
            $window.localStorage.token = data.token;
            User.me(data.token).then(function(){
              def.resolve();
            });
          }).error(function (err) {
            def.reject(err);
          });
        } else {
          def.reject();
        }
      }, function (err) {
        def.reject(err);
      });
      return def.promise;
    }
  }
})(angular);