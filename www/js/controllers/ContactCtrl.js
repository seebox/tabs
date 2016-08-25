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
	
	
	$ionicModal.fromTemplateUrl('search-modal.html', {
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
	
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.query={};
		$scope.result=[];
	};
	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

});
