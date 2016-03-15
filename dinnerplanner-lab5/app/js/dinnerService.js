// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var numberOfGuest = 1;

  this.checkConfirmButton = function(){
    var confirmSwitch=true;
    if(menu.length>0){
      confirmSwitch=false;
    }

    return confirmSwitch;
   }


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
    $cookieStore.put("numberOfGuest",num);
  }

  this.getNumberOfGuests = function() {
    if($cookieStore.get("numberOfGuest")!=undefined){
      numberOfGuest=$cookieStore.get("numberOfGuest");
    }
    return numberOfGuest;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'66J8l00npnHHZcCNLRhxkfW1OHxbojy4'});
  
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'66J8l00npnHHZcCNLRhxkfW1OHxbojy4'}); 

  var totalCost = 0;

  var menu = [];
  var menuInCookies=[];


  this.getFullMenu = function(){
    return menu;
  }

  this.addDishToMenu = function(obj, cost){
    totalCost += cost;
    menu.push(obj);
    menuInCookies.push(obj.RecipeID);
    $cookieStore.put("menuInCookies", menuInCookies);
  }

  this.getMenuInCookies = function(){
    return menuInCookies;
  }

  this.removeDishFromMenu = function(pos, cost){   
    if(menu != undefined){
      totalCost -= cost;
      menu.splice(pos, 1);
      menuInCookies.splice(pos, 1);
    }
    $cookieStore.put('menuInCookies', menuInCookies);
  }


  this.getTotalMenuPrice = function(guests){
    return totalCost*guests;
  }

  var menuCookie = $cookieStore.get('menuInCookies');

  if(menuCookie){
    var oldMenuCookie = menuCookie;
    menuCookie = [];

    for(key in oldMenuCookie){
      var dishID = oldMenuCookie[key];

      var self = this;
      this.Dish.get( {id:dishID} ,function(data){
        self.addDishToMenu(data, data.Ingredients.length);
      },function(data){
        // do nothing if error
      });
    }
  }else{
    menuCookie = [];
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});