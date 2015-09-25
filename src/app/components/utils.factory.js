(function (angular) {
  'use strict';
  angular.module('app').factory('utils', utils);

  function utils() {
    return {
      generatePin: generatePin,
      validateEmail: validateEmail,
      validatePhone: validatePhone,
      validatePassword: validatePassword
    };

    function generatePin(lenght) {
      lenght = lenght || 6;
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for( var i=0; i < lenght; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    function validatePhone(phone) {
      var re = /^[0-9]{11,14}$/;
      return re.test(phone);
    }
    function validatePassword(password) {
      return true;
    }
  }
})(angular);