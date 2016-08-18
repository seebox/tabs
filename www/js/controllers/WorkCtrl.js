$controllers.controller('BacklogListCtrl', function($scope, $http, $rootScope, $stateParams) {

	$scope.title = $stateParams.en == 'todo' ? '待我处理' : '待我查阅';

	$scope.loadData=function(){
		$http.get($rootScope.$host + '/application/japi/application/my' + $stateParams.en + 'list')
		.success(function(data) {
			$scope.mytoList = data;
		}).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
	};
	
	$scope.doRefresh = function() {
		$scope.loadData();
	};
	
	$scope.loadData();
})

.controller('WorkCtrl', function($scope, $http, $rootScope) {

	$http.get($rootScope.$host + '/lua-api/v1/app/commonlist').success(function(data) {
		$scope.playlists = data;
	});

	$http.get($rootScope.$host + '/application/japi/application/mytodolist').success(function(data) {
		$scope.todoList = data.slice(0, 5);
	});

	$http.get($rootScope.$host + '/application/japi/application/mytoreadlist').success(function(data) {
		$scope.toreadList = data.slice(0, 5);
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
		var top = angular.element("#banner").offset().top;
		console.log(top);
		if (dY > 0) {
			if (top > 47) {
				$scope.bannerStyle = {
					'width' : 'auto',
					'height' : dY + 'px'
				};
			} else {
				$scope.bannerStyle = {
					'width' : 'auto',
					'height' : oH + dY + 'px'
				};
			}

		}

	};

});
