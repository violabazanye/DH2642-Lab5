// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var numberOfGuest = 2;


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'18f3cT02U9f6yRl3OKDpP8NA537kxYKu'});
  
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'18f3cT02U9f6yRl3OKDpP8NA537kxYKu'}); 

  var menu = [];

  this.getFullMenu = function(){
    return menu;
  }

  this.removeDishFromMenu = function(pos){
    menu.splice(pos, 1);
  }

  var totalCost = 0;
  this.getTotalMenuPrice = function(){
    // use querySelector to find all second table cells
    var cells = document.querySelectorAll("td + td");

    for (var i = 0; i < cells.length; i++){
      totalCost+=parseFloat(cells[i].firstChild.data);
    }
    return totalCost;
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});