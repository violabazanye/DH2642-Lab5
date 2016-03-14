// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var numberOfGuest = 1;


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  this.writeCookie = function(num){
    $cookieStore.put("numOfGuests", num);
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'0OV23011kU7B3VVVgxTTTIfdNXeTI3us'});
  
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'0OV23011kU7B3VVVgxTTTIfdNXeTI3us'}); 

  var totalCost = 0;

  var menu = [];

  this.getFullMenu = function(){
    return menu;
  }

  this.writeMenuCookie = function(ID){
    $cookieStore.put("dishID", ID);
  }

  this.addDishToMenu = function(obj, cost){
    totalCost += cost;
    menu.push(obj);
  }

  this.removeDishFromMenu = function(pos, cost){   
    if(menu != undefined){
      totalCost -= cost;
      menu.splice(pos, 1);
    }
  }

  this.getTotalMenuPrice = function(guests){
    return totalCost*guests;
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});