(function(angular) {
  var app = angular.module('moviecat', ['ngRoute', 'moviecat.module_list']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/in_theaters/1'
      });
  }]);

  app.controller('MainController', ['$scope', '$location', function($scope, $location) {
    // console.log($location.path()); ///coming_soon/2
    $scope.$location = $location;
    //监听地址栏的变化，如果路径发生变化，通过改变focusNum的值，来改变sidebar的焦点状态
    $scope.$watch('$location.path()', function(now, old) {
      if (now.startsWith('/in_theaters')) {
        $scope.focusNum = 1;
      } else if (now.startsWith('/coming_soon')) {
        $scope.focusNum = 2;
      } else if (now.startsWith('/top250')) {
        $scope.focusNum = 3;
      }
    });
  }]);
})(angular);
