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
	
	$scope.profileObj={};

	$scope.openModal = function(type,title) {
		$scope.modal.show();
		$scope.modalTitle=title;
		$scope.profileType=type;
		$scope.profileObj.mobile=$scope.profile.contact.mobile;
		$scope.profileObj.officephone=$scope.profile.contact.officephone;
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	
	$scope.$on('modal.hidden', function() {
	});

	

});
