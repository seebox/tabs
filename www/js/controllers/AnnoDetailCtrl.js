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
