$controllers

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
});
