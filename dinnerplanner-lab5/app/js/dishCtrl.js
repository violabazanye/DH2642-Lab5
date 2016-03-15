// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.recipe = Dinner.Dish.get({id:$routeParams.dishId});

  $scope.dishCost = function(items){
  	return items * Dinner.getNumberOfGuests();
  }

  $scope.addDish = function(){
    Dinner.addDishToMenu(this.recipe, this.recipe.Ingredients.length);
  }
  
});