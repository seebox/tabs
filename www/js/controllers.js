angular.module('starter.controllersd', [])

.controller('LoginCtrl', function($scope, $http, $rootScope, $state, $ionicLoading, $ionicBackdrop) {
  $scope.isAuth = window.localStorage.username;
  $scope.loginData = {};
  $scope.doLogin = function(username, passowrd) {

    var account = $scope.loginData.username || username;
    var password = $scope.loginData.password || passowrd;

    $http.post($rootScope.$host + '/gettoken', {
      account: account,
      password: password
    }).success(function(data) {

      if (data.res_code == 100) {
        window.localStorage.token = data.user_info.token;
        window.localStorage.username = account;
        window.localStorage.password = password;
        $rootScope.$token = data.user_info.token;
        $ionicLoading.hide();
        $state.go("tab.work", {}, {
          location: false,
          reload: true
        });
      }
    });
  };

  if (false && window.localStorage.username && window.localStorage.password) {
    $ionicLoading.show({
      template: '正在加载...'
    });
    $scope.doLogin(window.localStorage.username,
      window.localStorage.password);
  }

})

.controller('MsgCtrl', function($scope) {
  var i = 0;
})

.controller('AnnoCtrl', function($scope, $http, $rootScope) {
  var count = 10,
    pagenum = 1,
    total = 10;
  $scope.playlists = [];
  $scope.loadAnnoData = function(isRefresh) {
    $http.get($rootScope.$host + '/lua-api/v1/anno/open', {
      params: {
        count: count,
        pagenum: pagenum
      }
    }).success(function(data) {
      if (isRefresh) {
        $scope.playlists = data.cards;
      } else {
        $scope.playlists = $scope.playlists.concat(data.cards);
      }
      total = data.total;
      pagenum++;
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.moreDataCanBeLoaded = function() {
    return $scope.playlists.length < total;
  }
  $scope.doRefresh = function() {
    count = 10;
    pagenum = 1;
    total = 10;
    $scope.loadAnnoData(true);
  }

  $scope.active = function(item) {
    $rootScope.title = item.name;
  }

})

.controller('AnnoDetailCtrl', function($scope, $http, $rootScope, $stateParams,$ionicPlatform,$preview,$state) {
  $http.get($rootScope.$host + '/lua-api/v1/card/get?id=' + $stateParams.id).success(function(data) {
    if (data.error) {

    } else {
      $scope.annodata = data;
    }

  });

  $scope.preview = function(atm) {
    if (atm.type == 'pdf') {
      $preview.pdf(atm);
    }
  };
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //   if($rootScope.pswp){
  //     $rootScope.pswp.close();
  //     delete $rootScope.pswp;
  //     return false;
  //   }
  // }, 100);
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //当我们用到模型时，清除它！
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})


.controller('WorkListCtrl', function($scope, $http, $rootScope, $stateParams) {
  var count = 10,
    pagenum = 1,
    total = 10;
  $scope.playlists = [];
  $scope.loadWorkData = function(isRefresh) {
    $http.get($rootScope.$host + '/lua-api/v1/workapp/stream/page', {
      params: {
        formname: $stateParams.en,
        count: count,
        pagenum: pagenum
      }
    }).success(function(data) {
      if (isRefresh) {
        $scope.playlists = data.cards;
      } else {
        $scope.playlists = $scope.playlists.concat(data.cards);
      }
      total = data.total;
      pagenum++;
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.moreDataCanBeLoaded = function() {
    return $scope.playlists.length < total;
  }
  $scope.doRefresh = function() {
    count = 10;
    pagenum = 1;
    total = 10;
    $scope.loadWorkData(true);
  }
})

.controller('WorkDetailCtrl', function($scope, $http, $rootScope, $stateParams) {

  $http.get($rootScope.$host + '/application/japi/application/sealform/get/' + $stateParams.id).success(function(data) {
    $scope.play = data;
  });

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function(){
    localStorage.removeItem("token");
    localStorage.removeItem("acc");
    window.location.href = "login.html";
  }
});
