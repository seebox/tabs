$controllers.controller('BacklogListCtrl', function($scope, $http, $rootScope, $stateParams) {

	$scope.title = $stateParams.en == 'todo' ? '待我处理' : '待我查阅';

	$scope.loadData=function(){
		$http.get($rootScope.$host + '/application/japi/application/my' + $stateParams.en + 'list')
		.success(function(data) {
			$scope.mytoList = data;
			$scope.empty=data.length==0?true:false;
		}).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
	};
	
	$scope.doRefresh = function() {
		$scope.loadData();
	};

	$scope.$on('stateChangeSuccess', function() {
		$scope.loadData();
	}); 

	$scope.moreDataCanBeLoaded=function(){
		return $scope.mytoList?false:true;
	};
	
})

.controller('WorkCtrl', function($scope, $http, $rootScope) {

	$http.get($rootScope.$host + '/lua-api/v1/app/commonlist').success(function(data) {
		$scope.playlists = data;
	});

	$http.get($rootScope.$host + '/application/japi/application/mytodolist').success(function(data) {
		$scope.todoList = data.slice(0, 5);
		$scope.load_todo=true;
		if(data.length<1){
			$scope.emptyTodo=true;
		}
	});

	$http.get($rootScope.$host + '/application/japi/application/mytoreadlist').success(function(data) {
		$scope.toreadList = data.slice(0, 5);
		$scope.load_toread=true;
		if(data.length<1){
			$scope.emptyToread=true;
		}
	});

	$scope.active = function(item) {
		$rootScope.workTitle = item.name;
	};

	$scope.bannerStyle = {
		'width' : '100%',
		'height' : 'auto'
	};

	var oH;

	$scope.onTouch = function($event) {
		oH = angular.element('#banner').height();
	};

	$scope.onRelease = function($event) {
		$scope.bannerStyle = {
			'width' : '100%',
			'height' : 'auto'
		};
	};

	$scope.onDrag = function($event) {
		var dY = $event.gesture.deltaY;
		var top = angular.element('.scroll').css('transform').match(/\d+\.?\d*/g).pop();
		if (dY > 0 && top == 0) {
				$scope.bannerStyle = {
					'width' : 'auto',
					'height' : oH + dY + 'px'
				};
			}


	};

});
