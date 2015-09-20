(function (angular) {
  'use strict';
  angular.module('app').controller('AppController', AppController);

  AppController.$inject = ['$state', 'User', '$mdSidenav'];

  function AppController($state, User, $mdSidenav) {
    var vm = this;
    vm.user = User;
    vm.logout = logout;
    vm.toggleLeftSidebar = toggleLeftSidebar;
    vm.go = go;
    vm.isState = isState;

    function toggleLeftSidebar() {
      $mdSidenav('left-menu').toggle();
    }

    function go(state){
      $mdSidenav('left-menu').close();
      $state.go(state);
    }
    function isState(state) {
      return $state.current.name === state;
    }
    function logout() {
      User.logout();
      $mdSidenav('left-menu').close();
    }
  }
})(angular);