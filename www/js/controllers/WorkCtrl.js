angular.module('starter.controllers', [])
.controller('WorkCtrl', function($scope, $http, $rootScope) {

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
	
	var oH;
	
	$scope.onTouch = function($event) {
		oH=angular.element('#banner').height();
	};
	
	$scope.onRelease=function($event){
		$scope.bannerStyle={
			'width':'100%',
			'height':'auto'
		};
	};

	$scope.onDrag = function($event) {
		var dY = $event.gesture.deltaY;
		var top=angular.element("#banner").offset().top;
		console.log(top);
		if(dY>0){
			$scope.bannerStyle={
				'width':'auto',
				'height':oH+dY + 'px'
			};
		}
		
	};

});
