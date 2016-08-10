// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $state, $location) {
  $ionicPlatform.ready(function() {
    $rootScope.$host = '';
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      $rootScope.$host = 'http://218.249.66.27:8888';
      //启动极光推送服务
      window.plugins.jPushPlugin.init();
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.localStorage.token) {
      $rootScope.$token = window.localStorage.token;
    } else {
      //$state.go("login",{},{reload:true});
      window.location.href = 'login.html';
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

  // Each tab has its own nav history stack:

  .state('tab.msg', {
      url: '/msg',
      views: {
        'tab-msg': {
          templateUrl: 'templates/tab-msg.html',
          controller: 'MsgCtrl'
        }
      }
    })
    .state('tab.anno', {
      url: '/anno',
      views: {
        'tab-anno': {
          templateUrl: 'templates/tab-anno.html',
          controller: 'AnnoCtrl'
        }
      }
    })
    .state('tab.anno-detail', {
      url: '/anno/:id',
      views: {
        'tab-anno': {
          templateUrl: 'templates/anno-detail.html',
          controller: 'AnnoDetailCtrl'
        }
      }
    })
    .state('tab.work', {
      url: '/work',
      views: {
        'tab-work': {
          templateUrl: 'templates/tab-work.html',
          controller: 'WorkCtrl'
        }
      }
    })

  .state('tab.work-list', {
      url: '/work/:en',
      views: {
        'tab-work': {
          templateUrl: 'templates/work-list.html',
          controller: 'WorkListCtrl'
        }
      }
    })
    .state('tab.work-detail', {
      url: '/work/detail/:id',
      views: {
        'tab-work': {
          templateUrl: 'templates/work-detail.html',
          controller: 'WorkDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/msg');

})

.config(['$httpProvider', function($httpProvider) {
  function authInterceptor($location, $injector,$q) {
    var interceptor = {
      'request': function(config) {
        config.headers = config.headers || {};

        if (window.localStorage.token) {
          config.headers.Authorization = window.localStorage.token;
        }
        return config;
      },
      'responseError': function(response) {
        if (response.status === 401) {
            //$injector.get('$state').go("login",{},{reload:true});
            window.location.href = 'login.html';
          }
        return $q.reject(response);
      }
    };
    return interceptor;
  }
  authInterceptor.$inject = ['$location', '$injector','$q'];
  $httpProvider.interceptors.push(authInterceptor);

}]);
