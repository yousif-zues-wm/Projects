var myApp = angular.module('myApp', []);
myApp.controller('MyController',['$scope', '$http', function MyController( $scope , $http) {
$http.get('js/data.json').then(function(response) {
      $scope.artists = response.data;
    },
    function(result) {
      console.log('HTTP request failed with result: ' + result);
    });
}]);
