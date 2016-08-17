$controllers

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

});
