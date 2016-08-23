angular.module('starter.services', [])

.factory('$preview', function($rootScope,$http,$ionicPlatform,$state) {


  return {
    pdf: function(atm) {
      if (atm.pagecount) {
        $rootScope.preview.show();
        $http.get($rootScope.$host + '/wx/pdf/pdf_pngs_info/' + atm.id).success(function(items) {
          var urls = [];
          for (var i = 0; i < items.length; i++) {
            urls.push({
              src: $rootScope.$host + '/wx/pdf/page/' + atm.id + '/' + (i+1).toString() + '.png',
              w: items[i].width?items[i].width:800,
              h: items[i].height?items[i].height:1200
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
    },
    picture: function(atms,preview){
      $rootScope.preview.show();
      var items = [],
        i = 0,
        index = 0;
      angular.forEach(atms, function(v, k) {
        var picType = /jpg|png|bmp|gif|jpeg/;
        if (v.type.toLowerCase().match(picType)) {
          items.push({
            src: $rootScope.$host + v.preview + '?token=' + $rootScope.$token,
            w: v.width?v.width:800,
            h: v.height?v.height:1200
          });
          i++;
          if (v.preview = preview) {
            index = i;
          }
        }
      });
      var pswpElement = document.querySelectorAll('.pswp')[0];
      // define options (if needed)
      var options = {
        history: false,
        index:index
      };

      // Initializes and opens PhotoSwipe
      $rootScope.pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      $rootScope.pswp.init();
      $rootScope.pswp.listen('close', function() {
        $rootScope.preview.hide();
      });
    }
  };
});
