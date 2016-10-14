$controllers

  .controller('MsgCtrl', function($scope, $http, $rootScope, $ionicPlatform) {

  $rootScope.db.list.orderBy("id")
    .toArray()
    .then(function(items) {      
      $scope.playlists = items;
      $scope.$apply();
    });

  $scope.activeUser = function(play){
    $rootScope.chatlist.show();
  }
  $scope.read = function(item) {
    console.log(item);;
  }


  var socket = io('http://218.249.66.27:8888/webim?token='+encodeURIComponent($rootScope.$token), {
		'transports' : ['websocket', 'polling']
	});

    socket.on('offline', function(data) {
			data = JSON.parse(data);

		});
  var onOpenNotification = function(event) {

  };
  document.addEventListener("jpush.openNotification", onOpenNotification, false);

});
