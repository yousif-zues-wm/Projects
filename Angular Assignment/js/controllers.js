var artistControllers = angular.module('artistControllers', ['ngAnimate']);
artistControllers.controller('ListController',['$scope', '$http', function ($scope , $http) {
$http.get('js/data.json').then(function(response) {
      $scope.artists = response.data;
      $scope.artistOrder = 'name';
    },
    function(result) {
      console.log('HTTP request failed with result: ' + result);
    });
}]);


artistControllers.controller('DetailsController',['$scope', '$http', '$routeParams', function ($scope , $http, $routeParams) {
$http.get('js/data.json').then(function(response) {
      $scope.artists = response.data;
      $scope.whichItem = $routeParams.itemId;
      $scope.nextItem = parseInt($routeParams.itemId) + 1;
      if ($routeParams.itemId > 0) {
        $scope.prevItem = parseInt($routeParams.itemId) - 1;
      }
      else if ($routeParams.itemId <= 0){
        $scope.prevItem = parseInt($routeParams.itemId) + $scope.artists.length - 2;

      }
      if ($routeParams.itemId < $scope.artists.length - 1) {
        $scope.nextItem = parseInt($routeParams.itemId) + 1;
      }
      else{
        $scope.nextItem = 0
      }
    },

    function(result) {
      console.log('HTTP request failed with result: ' + result);
    });
}]);
