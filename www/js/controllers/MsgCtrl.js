$controllers

.controller('MsgCtrl', function($scope,$http,$rootScope) {

   $http.get($rootScope.$host + "/lua-api/v1/proxy/unreads?source=msg&count=10&pagenum=1").success(function(data) {
  		   $scope.playlists = data.unreads;
   });
  var onOpenNotification = function(event) {
    alert(1);
  };
  document.addEventListener("jpush.openNotification", onOpenNotification, false);

});
