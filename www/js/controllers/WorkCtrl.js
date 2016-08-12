
angular.module('starter.controllers', [])

.controller('WorkCtrl', function($scope, $http, $rootScope) {

  $http.get($rootScope.$host + '/lua-api/v1/app/commonlist').success(function(data) {
    $scope.playlists = data;
  });

  $scope.active = function(item) {
    $rootScope.workTitle = item.name;
  }
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
