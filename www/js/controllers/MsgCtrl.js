$controllers

  .controller('MsgCtrl', function($scope, $http, $rootScope) {

  var count = 10,
    pagenum = 1,
    total = 10;
  $scope.playlists = [];
  $scope.loadData = function(isRefresh) {
    $http.get($rootScope.$host + "/lua-api/v1/proxy/unreads", {
      params: {
        source: 'msg',
        count: count,
        pagenum: pagenum
      }
    }).success(function(data) {
      if (isRefresh) {
        $scope.playlists = data.unreads;
      } else {
        $scope.playlists = $scope.playlists.concat(data.unreads);
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
    $scope.loadData(true);
  }

  $scope.read = function(item) {
    console.log(item);;
  }


  var onOpenNotification = function(event) {
    alert(1);
  };
  document.addEventListener("jpush.openNotification", onOpenNotification, false);

});
