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
		organ.folding=organ.userShow?'ion-arrow-down-b':'ion-arrow-right-b';
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
	
	$scope.openSearchModal = function(type,title) {
		$scope.searchModal.show();
		$scope.modalTitle=title;
		$scope.profileType=type;
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
	});

});
