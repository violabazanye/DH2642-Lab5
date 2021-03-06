// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner,$cookieStore) {

  // TODO in Lab 5: you will need to implement a method that searches for dishes
  // including the case while the search is still running.
  $scope.$on('$viewContentLoaded', function(){
    $scope.status = "Searching...";
    Dinner.DishSearch.get(function(data){
      $scope.dishes=data.Results;
      $scope.status = "Showing " + data.Results.length + " results";
    },function(data){
      $scope.status = "There was an error. Try again.";
    });
  });

  $scope.search = function(query, dishType) {
  	$scope.status = "Searching...";
   	Dinner.DishSearch.get({any_kw:query},{category:dishType},function(data){
    	$scope.dishes=data.Results;
     	$scope.status = "Showing " + data.Results.length + " results";
   	},function(data){
     	$scope.status = "There was an error. Try again.";
   	});
  }

});