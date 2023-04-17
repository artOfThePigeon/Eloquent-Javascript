// The Secret Life of Objects

// Methods

// Methods are nothing more than properties that hold function values.

let rabbit = {};
rabbit.speak = function(line) {
	console.log(`the rabbit says '${line}'`);
}
rabbit.speak("I'm alive.")

// Usually a method needs to do something with the object it was called on.
// When a function is called as a method—looked up as a property and 
// immediately called, as in object.method()—the binding called 'this' in
// its body automatically points at the object that it was called on. 

function speak(line) {
	console.log(`The ${this.type} rabbit says, '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
				   "how late it's getting!");
hungryRabbit.speak("I could use a carrot right now.")

// You can think of 'this' as an extra paramter that is passed in a different way.
// If you want to pass it explicitly, you can use a function's 'call' method, which 
// takes the 'this' value as its first argument, and treats further arguments as normal parameters.

speak.call(hungryRabbit, "Burb!");

// Arrow function do not bind their own 'this' but can see the 'this' binding of the scope
// around them. Thus, you can do something like the following code which references 'this' from inside
// a local function.
function normalize() {
	console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]


// Prototypes

let empty = {};
console.log(empty.toString);
// → ƒ toString() { [native code] }
console.log(empty.toString());
// → [object Object]
// I pulled a property out of an empty object. Magic!

// In addition to their set of properties, most objects also have a prototype.
// This gets serached for when an object gets a request for a property it does not have.

console.log(Object.getPrototypeOf({}) ==
		    Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null 

console.log(Object.getPrototypeOf(Math.max) == 
	        Function.prototype);
// → true

console.log(Object.getPrototypeOf([]) ==
			Array.prototype);
// → true

let protoRabbit = {
	speak(line) {
		console.log(`The ${this.type} rabbit says'${line}'`);
	}
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak("SKREEEE!");
// A property like speak(line) in an object expression is a short hand way of defining a method.
// It creates a property called speak and gives it a function as its value.

// Classes

function makeRabbit(type) {
	let rabbit = Object.create(protoRabbit);
	rabbit.type = type;
	return rabbit;
}

// the prototype object used when constructing objects is found by taking the prototype property of the constructor function:

function Rabbit(type) {
	this.type = type;
}
Rabbit.prototype.speak = function(line) {
	console.log(`The ${this.type} rabbit says '${line}'`)
};

let weirdRabbit = new Rabbit("weird");
// The keyword 'new' in front of a function call makes the function treated as a contructor


// Class Notation

// javascript classes are constructor functions with a prototype property.
class Rabbit {
	constructor(type) {
		this.type = type;
	}
	speak(line) {
		console.log(`The ${this.type} rabbit says '${line}'`)
	}
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

// life 'function,' 'class' can be used both in statements and in expressions. when used as an expression,
// it doesn't define a binding but just produces the constructor as a value. You are allowed to omit the class name
// in a class expression

let object = new class { getWord() { return "hello";} };
console.log(object.getWord());

// Overriding derived Properties

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody

















































