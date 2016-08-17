$controllers

.controller('WorkDetailCtrl', function($scope, $http, $rootScope, $stateParams) {

  $http.get($rootScope.$host + '/application/japi/application/sealform/get/' + $stateParams.id).success(function(data) {
    $scope.play = data.data;
  });

});
