/**
 * -------------------------------------------------------------------
 *
 * HOMEWORK for Thursday - Sunday, July 10-13, 2014
 *
 * Part 1:
 *
 * √ Create a Cat, Dog, Horse, and Barn function.
 * √ add two functions each to Cat, Dog, and Horse; one of whch should be a speak() function.
 * √ ALL PROTOTYPE FUNCTIONS (i.e. speak()) MUST HAVE AT LEAST 1 ARGUMENT
 * - I've added a function to Barn that .shelter()'s any animal, and stores that animal in an array on `this`...
 * - write a function on Barn's prototype (called .rollCall()) that makes all animals being sheltered speak()
 *
 * ! some starter code below
 *
 * -------------------------------------------------------------------
 */
 //     var out;
 //     if (this.answer === "Y") {
 //         // console.log("this shouldnt print out stuff");
 //         return;
 //     }
 //     switch (this.type) {
 //         case "Dog":
 //             out = "Hello Ma'am, or should I say in canine expression, Bitch perhaps!?";
 //             break;
 //         case "Horse":
 //             out = "Hi Sir, I have a pHD in Bio-Engineering";
 //             break;
 //         case "Monkey":
 //             out = "Collective Noise";
 //             break;
 //         default:
 //             out = "No noise";
 //     }
 //     console.log(out);
 // };

///////////////////// PART 1

function Cat(type, YN) {
	this.type = type;
	this.talks = YN;
}

Cat.prototype.speak = function(isYelling) {
	console.log('aaaaw');
}

Cat.prototype.meow = function(isRoaring) {
	console.log('meow');
}
	
function Dog(breed, YN) {
	this.breed = breed;
	this.talks = YN;
}

Dog.prototype.speak = function(isYelling) {
	console.log('aaaaw');
}

Dog.prototype.bark = function(isGrowling) {
	console.log('woof');
}

function Barn() {
    this.shelteredAnimals = [];
}

Barn.prototype.shelter = function(animal) {
    this.shelteredAnimals.push(animal);
}

Barn.prototype.rollcall = function(){
	(this.shelteredAnimals).forEach
	(function(animals)
	{
		return animals.speak();
	})
}
         
var fullbarn = new Barn();

var bulldog = new Dog("german","Y");
var pussycat = new Cat();

fullbarn.shelter(bulldog);
fullbarn.shelter(pussycat);

bulldog.speak();

fullbarn.rollcall();

/////////////////// PART 2

function Calculator(value){
	this.value = parseInt(value) || 0;
}

// Calculator.prototype.ErrThrow = function(){
// 	try{
// 		statement;
// // 	}catch{
// 		statement;
// }

var Calc = new Calculator(askForNumber());


Calculator.prototype.multiply = function(x, y){
	if(typeof x === "number" && typeof y === "number"){
		return x * y;
	} else if (typeof x === "number" && typeof y !== "number"){
		this.value *= x;
	} else {
		throw new Error("x should be a number");
	}
}

Calc.multiply(5);
// console.log(Calc.value);


Calculator.prototype.addition = function(x, y){
	if(typeof x === "number" && typeof y === "number"){
		return x + y;
	}else if(typeof x ==="number" && typeof y !== "number"){
		this.value += x;
	}else{
		throw new Error('X not a number!');
	}
}

Calc.addition(5);


Calculator.prototype.subtract = function(x, y){
	if(typeof x === "number" && typeof y === "number"){
		return x - y;
	}else if(typeof x ==="number" && typeof y !== "number"){
		this.value -= x;
	}else{
		throw new Error('X not a number!');
	}
}


Calc.subtract(5);


Calculator.prototype.divide = function(x, y){
	if(typeof x === "number" && typeof y === "number"){
		return x / y;
	}else if(typeof x ==="number" && typeof y !== "number"){
		this.value /= x;
	}else{
		throw new Error('X not a number!');
	}
}

Calc.divide(5);

/// Error Checking ///

function askForNumber(){
   
   	var number = prompt("Please Enter a number");

	try {
        number = handleResponse(number);
    } catch(e) {
        console.log(e, e.stack);
        askForNumber();//recursion
    }
    return number;	
}

function handleResponse(number){
    number = parseFloat(number);
    if(typeof number !== "number" || Number.isNaN(number)){ // is it not a number or is it NaN?
        throw new Error("Not a number. Please Enter Again!");
    } else {
        alert('You typed in number: '+number+'!');
    }
    return number;
}
