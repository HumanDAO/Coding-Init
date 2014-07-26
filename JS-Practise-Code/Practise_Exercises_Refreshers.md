//USER SELECTION

var yourName = "bob";
var gender = "female";
var result = "";

if (yourName === true && gender == false) {
  result = "His name is "+ yourName;
} else if (yourName === true && gender == true) {
  result = "Her name is "+ yourName;
} else {
  result = "Hi "+yourName;
}

var yourName = "f";
var gender = "female";
var result;

//Line 10 starts an if statement
//Nested in this if statement is an if else statement on lines 11 - 15
//This nested if else statement allows us to check another condition
//We close the first if statement at the start of line 16

if (yourName.length>0 && gender.length>0) {
  if (gender==="male" || gender==="female") {
	result = "Thanks";
  } else {
	result = "Please enter male or female for gender.";
  }
} else {
  result = "Please tell us both your name and gender.";
}


var checkNameGender = function (yourName,gender) {
//All the code below was used in exercise 1.6
  
    if (gender.length > 0 && yourName.length > 0) {
      if (gender === 'male' || gender === 'female') {
            return true;
      } else {
            return false;
      }
    } else {
      return false;
    }
};

checkNameGender("bitch", "male");


// Define the function under this line

function canIDrive(myAge, legalDrivingAge){
    if(myAge>=legalDrivingAge){
        return true;
    }
    else{
        return false;
    }
};


// Declare legalDrivingAge under myAge
var myAge = prompt("How old are you?");
var legalDrivingAge = 18;
//Create an if else statement using the function as a condition
if (canIDrive(19,21)) {
  console.log("You can legally drive!");
}
else {
  console.log("You'll have to wait a few more years!");
}

//////////////////

var born = prompt("What country were you born in?")
var result;

switch (born) {

    case "USA":
    result = "Born in the USA";
    break;
    
    default:
    result = "Born outside the USA";
    break;
}

////////////////
// TERNARY OPERATOR

result = x > y ? "good job" : "not good";

var x = 10;
var y = 11;

if (x > y) {
  result = "good job";
}
else {
  result = "not good";
}

////////////////

var city = prompt("which city fool?");
var fixedCosts = 5000;
var Rent;
    
function calculateTotalCosts(salary, numWorkers, city){
    var variableCosts = salary*numWorkers;
    
    switch (city){
    case "NYC":
        Rent = 300000;
    break;
    
    case "BEJ":
        Rent = 25000;
    break;
    
    default:
        Rent = 10000;
    break;
    }
    
    return Total = variableCosts + fixedCosts + Rent;
    
};

console.log(calculateTotalCosts(40000, 3,"NYC"));

////////////////////////////////////////////////////

//TAXI TRIP COST//

var tripCost = taxiFare(50, 3);

function taxiFare(milesTraveled, hourOfDay) {
  var baseFare = 2.50;
  var costPerMile = 2.00;
  var cost = baseFare + (costPerMile * milesTraveled)

  cost = cost + surCharge(hourOfDay);
  
  return cost;
};

function surCharge(pickupTime) {
  var nightSurcharge = 0.00;

  if (pickupTime >= 20 || pickupTime < 6){
      nightSurcharge = 0.75;
      }
      
  return nightSurcharge;
  }

//BLACKJACK GAME//////////////////////////////

// Our deal function will return a random card
var deal = function() {
  card = Math.floor(Math.random()*52+1);
  return card;
};

// Deal out our first hand
var card1 = deal();
var card2 = deal();

// This function takes a card as a parameter and returns the value
// of that card
var getValue = function(card) {
  // if its a face card, number should be set to 10        
    if(card%13==true || card%13>10) {
        return 10;
    }
    // Otherwise number should be set to card modulo 13
    else if(card%13 == 1){
        return 11;
    }
  // Otherwise, we just want its number value (should be set to card modulo 13)
    else{
        return card%13;
    }
}-
// Score the hand
function score() {
  return getValue(card1) + getValue(card2);
}

console.log("You have cards " + card1 + " and " + card2 +
        " for a score of " + score(card1, card2));
