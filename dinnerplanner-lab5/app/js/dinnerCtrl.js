// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner,$cookieStore) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
    Dinner.writeCookie(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.menuDishes = Dinner.getFullMenu();

  $scope.dishCost = function(items){
  	return items * Dinner.getNumberOfGuests();
  }

  $scope.getTotalMenuPrice = function(){
    return Dinner.getTotalMenuPrice(Dinner.getNumberOfGuests());
  }

  $scope.remove = function(pos){
    Dinner.removeDishFromMenu(pos, this.menuDishes[pos].Ingredients.length * Dinner.getNumberOfGuests());
  }

});