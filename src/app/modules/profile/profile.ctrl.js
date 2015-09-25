(function (angular) {
  'use strict';
  angular.module('app').controller('ProfileController', ProfileController);

  ProfileController.$inject = ['User'];
  function ProfileController(User) {
    var vm = this;

    vm.user = angular.copy(User.data);
    vm.getFullName = getFullName;

    function getFullName() {
      return vm.user.profile ? vm.user.profile.firstName + (vm.user.profile.lastName ? ' ' + vm.user.profile.lastName : '') : '';
    }

  }
})(angular);