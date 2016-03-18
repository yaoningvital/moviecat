(function(angular) {

  angular.module('moviecat.module_list', ['ngRoute', 'my_jsonp'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/:category/:page', {
          controller: 'ModuleListController',
          templateUrl: 'module_list/view.html'
        });
    }])
    .controller('ModuleListController', ['$scope', '$http', '$route', '$routeParams', 'MyJsonp', function($scope, $http, $route, $routeParams, MyJsonp) {
      // $http.get('data/data.json')
      //   .success(function(response) {
      //     $scope.subjects = response.subjects;
      //     $scope.title = response.title;
      //   });

      // $http.jsonp('http://api.douban.com/v2/movie/in_theaters?count=10&start=0&callback=JSON_CALLBACK')
      //   .success(function(response) {
      //     console.log(response);
      //   });

      var count = 10;
      var start = 0;
      var page = parseInt($routeParams.page);
      if (page < 1) {
        page = 1;
        $route.updateParams({ page: 1 });
      }
      start = (page - 1) * 10;

      //=========设置传递给回调函数的参数(url、query_params、callback)===start================
      var url = 'http://api.douban.com/v2/movie/' + $routeParams.category;
      var query_params = { count: count, start: start };

      function callback(data) {
        // 共{{totalCount}}条记录，第{{currentPage}}页/共{{totalPage}}页
        $scope.subjects = data.subjects;
        $scope.title = data.title;
        $scope.completed = true;

        $scope.totalCount = data.total; //该类型总共多少条记录
        $scope.totalPage = Math.ceil(data.total / count); //共几页
        if (page > $scope.totalPage) {
          page = $scope.totalPage;
        }
        $route.updateParams({ page: page });
        $scope.currentPage = page; //当前是第几页

        $scope.$apply();
      }
      //=========设置传递给回调函数的参数(url、query_params、callback)=====end==============

      //=========调用jsonp方法，向豆瓣服务器发送数据请求===start======
      MyJsonp.jsonp(url, query_params, callback);
      //=========调用jsonp方法，向豆瓣服务器发送数据请求===end======

      $scope.changePage = function(p) {
        $scope.completed = false;
        if (p < 1) {
          p = 1;
        } else if (p > $scope.totalPage) {
          p = $scope.totalPage;
        }
        page = p;
        start = (page - 1) * 10;
        query_params = { count: count, start: start };
        MyJsonp.jsonp(url, query_params, callback);
      };


    }]);
})(angular);
