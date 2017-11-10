app.controller('MainController', ['$scope', 'forecast', function ($scope, forecast) { 

	  forecast.success(function(data) { 
    $scope.fiveDay = data; 
      $scope.path('google.com')
  });
}]);
