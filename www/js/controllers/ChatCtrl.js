$controllers

  .controller('ChatCtrl', function($scope, $http, $rootScope, $stateParams) {

    $http.get($rootScope.$host + '/lua-api/v1/user/getinfo',{
      params: {
        acc: $stateParams.acc
      }
    }).success(function(data){
      $scope.user = data;
      $rootScope.db.list.add({
        id: data.id,
        acc: data.acc,
        name: data.name,
        avatar: data.avatar100,
        ops: data.ops
      });
  	});
});
