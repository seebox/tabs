$controllers

  .controller('MsgCtrl', function($scope, $http, $rootScope,$ionicPlatform) {

  var count = 10,
    pagenum = 1,
    total = 10;
  $scope.playlists = [];

    $http.get($rootScope.$host + "/lua-api/v1/proxy/unreads", {
      params: {
        source: 'msg',
        count: count,
        pagenum: pagenum
      }
    }).success(function(data) {

        //$scope.playlists = data.unreads;

    });
    $ionicPlatform.ready(function() {

          if (window.cordova) {
          window.bluetoothSerial.list(function(data){
            $scope.playlists = data;
          }, function(data){
             alert(2);
          });

        }
    });
    $scope.connect = function(item){
      bluetoothSerial.connect(item.id, function(){
         alert('yes');
      }, function(){
         alert(3);
      });
    };
    $scope.send = function(){
      bluetoothSerial.write('window\r\window\r\window\r\window\r\window\r\window\r\n\r\n\r\n\r\n', function(){

      }, function(){
         alert(4);
      });
    };
    (function() {
      var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
      var openRequest = indexedDB.open('wti');
      openRequest.onerror = function(e) {
        console.log("Database error: " + e.target.errorCode);
      };
      openRequest.onsuccess = function(event) {
        console.log("Database success");
        //window.localDatabase.db = openRequest.result;
      };
    })();
  $scope.read = function(item) {
    console.log(item);;
  }


  var onOpenNotification = function(event) {
    alert(1);
  };
  document.addEventListener("jpush.openNotification", onOpenNotification, false);

});
