$controllers

  .controller('TabsCtrl', function($scope, $http, $rootScope, $ionicPlatform,$ionicTabsDelegate,$state,$stateParams) {

    $scope.selectTabWithIndex = function(index) {
      $state.transitionTo('tab.anno', $stateParams, {
    reload: true, inherit: false, notify: true
  });
    //$ionicTabsDelegate.select(index,true);
    }

});
