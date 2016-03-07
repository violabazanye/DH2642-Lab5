dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

	$scope.finalDishes = Dinner.getFullMenu();

	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.setNumberOfGuest = function(number){
	    Dinner.setNumberOfGuests(number);
	  }

	$scope.getNumberOfGuests = function() {
	    return Dinner.getNumberOfGuests();
	  }
});