angular.module('starter.controllers', []).controller('WorkCtrl', function($scope, $http, $rootScope) {

	$http.get($rootScope.$host + '/lua-api/v1/app/commonlist').success(function(data) {
		$scope.playlists = data;
	});

	$scope.active = function(item) {
		$rootScope.workTitle = item.name;
	};
	
	$scope.bannerStyle={
		'width':'100%',
		'height':'auto'
	};
	
	$scope.onTouch = function($event) {
		oY = $event.target.offsetTop;
	};
	
	$scope.onRelease=function($event){
		$scope.bannerStyle={
			'width':'100%',
			'height':'auto'
		};
	};

	$scope.onDrag = function($event) {
		dY = $event.gesture.deltaY;
		console.log(oY);
		$scope.bannerStyle.height = oY+dY + 'px';
		$scope.bannerStyle.width='auto';
	};

});
