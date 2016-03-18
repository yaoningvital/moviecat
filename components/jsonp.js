(function(angular) {
  angular.module('my_jsonp', [])
    .service('MyJsonp', ['$window', '$document', function($window, $document) {

      this.jsonp = function(url, data, callback) {
        //  http://api.douban.com/v2/movie/in_theaters?count=10&start=0&callback=my_jsonp_cb_567890611029383
        //1、将回调函数挂载到全局对象上
        var cbfn_name = 'my_jsonp_cb_' + Math.random().toString().replace('.', '');
        $window[cbfn_name] = callback;
        //2、拼合好请求的src地址
        var src = url;
        src += src.indexOf('?') != -1 ? '&' : '?';
        for (key in data) {
          src += key + '=' + data[key] + '&';
        }
        src += 'callback=' + cbfn_name;
        //3、在插入新创建的script标签之前，判断前面有没有之前创建的script标签，如果有，就删除
        var scriptTag = $document[0].body.lastElementChild;
        if (scriptTag.nodeName == 'SCRIPT' && scriptTag.src.startsWith('http://api.douban.com')) {
          $document[0].body.removeChild(scriptTag);
        }
        //4、创建script标签，将标签插入到页面中
        var script = $document[0].createElement('script');
        script.src = src;
        $document[0].body.appendChild(script);
      };
    }])
})(angular);
