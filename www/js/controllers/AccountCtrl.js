$controllers

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.logout = function() {
    localStorage.removeItem("token");
    localStorage.removeItem("acc");
    window.location.href = "login.html";
  }
});
