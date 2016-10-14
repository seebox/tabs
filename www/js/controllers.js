$controllers.controller('AccountCtrl', function($scope, $http, $ionicModal, $rootScope) {
	$scope.settings = {
		enableFriends : true
	};
	$scope.logout = function() {
		localStorage.removeItem("token");
		localStorage.removeItem("acc");
		window.location.href = "login.html";
	};
	
	$http.get($rootScope.$host + '/lua-api/v1/user/profile').success(function(data){
		$scope.profile=data;
	});

	$ionicModal.fromTemplateUrl('datum-modal.html', {
		scope : $scope,
		focusFirstInput:true
	}).then(function(modal) {
		$scope.modal = modal;
	});
	
	$scope.openModal = function(type,title) {
		$scope.modal.show();
		$scope.modalTitle=title;
		$scope.profileType=type;
	};
	
	$scope.submit=function(){
		var json={
			'mobile':$scope.profile.contact.mobile,
			'officephone':$scope.profile.contact.officephone,
			'sex':$scope.profile.base.sex?$scope.profile.base.sex:'',
			'degree':$scope.profile.base.degree?$scope.profile.base.degree:''
		};
		$http({
			method : 'post',
			url : $rootScope.$host + '/zone/japi/zone/user/profile/modify',
			data : json,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			transformRequest : function(obj) {
				var str = [];
				for(var p in obj) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
				return str.join("&");
			}
		}).success(function(data) {
			$scope.modal.hide();
		});
		
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	
	$scope.$on('modal.hidden', function() {
	});
	

})
.directive('changeSelect', function() {
	return {
		restrict : 'A',
		scope : false,
		require : '?ngModel',
		link : function(scope, element, attrs, ngModel) {
			element.on('click','.item',function(e){
				element.find('.ion-android-done').remove();
				ngModel.$setViewValue($(this).attr('attr'));
				$(this).append('<i class="ion-android-done positive f-r"></i>');
			});
			ngModel.$render=function(){
				if(ngModel.$modelValue){
					element.find('.item[attr='+ngModel.$modelValue+']').append('<i class="ion-android-done positive f-r"></i>');
				}else{
					ngModel.$setViewValue('');
				}
			};
		}
	};
}); 
$controllers

.controller('AnnoCtrl', function($scope, $http, $rootScope) {
  var count = 10,
    pagenum = 1,
    total = 10;
  $scope.playlists = [];
  $scope.loadAnnoData = function(isRefresh) {
    $http.get($rootScope.$host + '/lua-api/v1/anno/open', {
      params: {
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
    $scope.loadAnnoData(true);
  }

  $scope.active = function(item) {
    $rootScope.title = item.name;
  }

});

$controllers

.controller('AnnoDetailCtrl', function($scope, $http, $rootScope, $stateParams, $ionicPlatform, $preview, $state) {
  $http.get($rootScope.$host + '/lua-api/v1/card/get?id=' + $stateParams.id).success(function(data) {
    if (data.error) {

    } else {
      $scope.annodata = data;
    }

  });

  $scope.preview = function(atm) {
    var picType = /jpg|png|bmp|gif|jpeg/;
    var docType = /doc|docx|ppt|pptx|xls|xlsx/;
    if (atm.type.toLowerCase() == 'pdf') {
      $preview.pdf(atm);
    } else if (atm.type.toLowerCase().match(picType)) {
      $preview.picture($scope.annodata.atms, atm.preview);
    } else if (atm.type.toLowerCase().match(docType)) {
      var ref = window.open(atm.preview, '_blank', 'location=yes');
    }
  };
});

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

$controllers

.controller('ContactCtrl', function($scope, $http, $rootScope, $ionicModal) {
	
	$http.get($rootScope.$host + '/lua-api/v1/organ/users').success(function(data){
		$scope.userList=data;
	});
	
	$scope.query={};
	$scope.search=function(query){
		$scope.result=[];
		var regx=eval('/' + query.replace(/(^\s*)|(\s*$)/g, "")+ '/g');
		if(regx){
			angular.forEach($scope.userList,function(v,k){
				angular.forEach(v.users,function(m,n){
					if(regx.test(m.name_pinyin)){
						$scope.result.push(m);
					}
				});
			});
		}
	};
	
	$scope.fold=function(organ){
<<<<<<< HEAD
		organ.folding=organ.userShow?'ion-arrow-down-b':'ion-arrow-right-b';
=======
		organ.folding=organ.userShow?'ion-arrow-right-b':'ion-arrow-down-b';
>>>>>>> e89d43efa270c2cf7383935b54dcda81c49e0a38
		organ.userShow=!organ.userShow;
	};
	
	$scope.jumpdetails=function(user){
		$http.get($rootScope.$host + '/lua-api/v1/user/get/'+user.id).success(function(data){
			$scope.profile=data;
			$scope.detailsModal.show();
		});
	};
	
	
	$ionicModal.fromTemplateUrl('search-modal.html', {
		scope : $scope,
		focusFirstInput:true
	}).then(function(modal) {
		$scope.searchModal = modal;
	});
	
<<<<<<< HEAD
	$scope.openSearchModal = function(type,title) {
		$scope.searchModal.show();
		$scope.modalTitle=title;
		$scope.profileType=type;
=======
	$scope.openSearchModal = function() {
		$scope.searchModal.show();
>>>>>>> e89d43efa270c2cf7383935b54dcda81c49e0a38
	};
	
	$scope.closeSearchModal = function() {
		$scope.searchModal.hide();
		$scope.query={};
		$scope.result=[];
	};
	
	$ionicModal.fromTemplateUrl('details-modal.html', {
		scope : $scope,
	}).then(function(modal) {
		$scope.detailsModal = modal;
	});
	
	$scope.closeDetailsModal = function() {
		$scope.detailsModal.hide();
	};
	
	$scope.$on('$destroy', function() {
		$scope.searchModal.remove();
<<<<<<< HEAD
=======
		$scope.detailsModal.remove();
>>>>>>> e89d43efa270c2cf7383935b54dcda81c49e0a38
	});

});

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

$controllers

  .controller('TabsCtrl', function($scope, $http, $rootScope, $ionicPlatform,$ionicTabsDelegate,$state,$stateParams) {

    $scope.selectTabWithIndex = function(index) {
      $state.transitionTo('tab.anno', $stateParams, {
    reload: true, inherit: false, notify: true
  });
    //$ionicTabsDelegate.select(index,true);
    }

});

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

$controllers

.controller('WorkDetailCtrl', function($scope, $http, $rootScope, $stateParams) {

  $http.get($rootScope.$host + '/application/japi/application/sealform/get/' + $stateParams.id).success(function(data) {
    $scope.play = data.data;
  });

});

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
