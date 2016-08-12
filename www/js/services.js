angular.module('starter.services', [])

.factory('$preview', function($rootScope,$http,$ionicPlatform,$state) {


  return {
    pdf: function(atm) {
      if (atm.pagecount) {
        $rootScope.preview.show();
        $http.get($rootScope.$host + '/wx/pdf/pdf_pngs_info/' + atm.id).success(function(items) {
          var urls = [];
          for (var i = 1; i <= atm.pagecount; i++) {
            urls.push({
              src: $rootScope.$host + '/wx/pdf/page/' + atm.id + '/' + i.toString() + '.png',
              w: items[i-1].width,
              h: items[i-1].height
            });
          }
          var pswpElement = document.querySelectorAll('.pswp')[0];
          // define options (if needed)
          var options = {
            history: false
          };


          // Initializes and opens PhotoSwipe
          $rootScope.pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, urls, options);
          $rootScope.pswp.init();
          $rootScope.pswp.listen('close', function() {
            $rootScope.preview.hide();
          });

          //主页面显示退出提示框
        });

      }
    }
  };
});
