(function (angular) {
  'use strict';
  angular.module('app', [
    'app.config',
    'ngCookies',
    'ui.router',
    'ngSanitize',
    'pascalprecht.translate',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'facebook',
    'googleplus'
  ])
      .config(configure)
      .run(runBlock);

  configure.$inject = ['appSettings', '$urlRouterProvider', '$locationProvider', '$translateProvider', '$mdThemingProvider', 'FacebookProvider', 'GooglePlusProvider'];

  function configure(appSettings, $urlRouterProvider, $locationProvider, $translateProvider, $mdThemingProvider, FacebookProvider, GooglePlusProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $urlRouterProvider.otherwise('/404');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/translation-',
      suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escaped');

    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
          'default': '700'
        })
        .accentPalette('amber', {
          'default': '500'
        })
        .warnPalette('deep-orange');

    $mdThemingProvider.theme('error-toast')
        .primaryPalette('red');

    $mdThemingProvider.theme('success-toast')
        .primaryPalette('green');

    $mdThemingProvider.theme('social');

    FacebookProvider.init({
      appId: appSettings.FACEBOOK.APP_ID,
      version: "v2.4"
    });

    GooglePlusProvider.init({
      clientId: appSettings.GOOGLE.CLIENT_ID,
      scopes: 'https://www.googleapis.com/auth/plus.profile.emails.read'
    });
  }

  runBlock.$inject = ['$rootScope', '$state', '$filter', 'User', '$window', '$translate'];

  function runBlock($rootScope, $state, $filter, User, $window, $translate){
    var language = $window.navigator.userLanguage || $window.navigator.language;
    switch (language.split('-')[0]){
      case 'ru':
      case 'ua':
        $translate.use('ru');
        break;
    }
    $rootScope.pageTitle = $filter('translate')('MAIN.BRAND');
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      if (toState.data && toState.data.isLogged && !User.isLogged) {
        event.preventDefault();
        $rootScope.redirect = toState.name;
        $state.go('app.signIn');
      }
      if(toState.data && toState.data.isNotLogged && User.isLogged) {
        event.preventDefault();
        $state.go('app.home');
      }
      $rootScope.pageTitle = toState.data && toState.data.title ? toState.data.title != 'MAIN.BRAND' ?
      $filter('translate')('MAIN.BRAND') + ' - ' + $filter('translate')(toState.data.title) :
          $filter('translate')(toState.data.title) :
          $filter('translate')('MAIN.BRAND');
    });
  }
})(angular);