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