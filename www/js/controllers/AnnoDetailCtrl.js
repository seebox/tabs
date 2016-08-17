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
      var items = [],
        i = 0,
        index = 0;
      angular.forEach($scope.annodata.atms, function(v, k) {
        if (v.type.toLowerCase().match(picType)) {
          items.push({
            src: $rootScope.$host + v.preview + '?token=' + $rootScope.$token,
            w: v.width,
            h: v.height
          });
          i++;
          if (atm.preview = v.preview) {
            index = i;
          }
        }
      });
      $preview.picture(items, index);
    } else if (atm.type.toLowerCase().match(docType)) {
      var ref = window.open(atm.preview, '_blank', 'location=yes');
    }
  };
});
