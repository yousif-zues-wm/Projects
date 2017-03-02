var myApp = angular.module('myApp', ['ngRoute', 'artistControllers']);
myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/list', {
    templateUrl: 'partials/list.html',
    controller : 'ListController'
  })
  .when('/details/:itemId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  })
  .when('/apply', {
    templateUrl: 'partials/apply.html',
    controller: 'applyController'
  })
  .when('/game', {
    templateUrl: 'partials/game.html',
    controller: 'GameController'
  })
  .otherwise({
      redirectTo: 'list'
  })

}]);
