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

whiteRabbit.speak ("Oh my ears and whiskers, " +
				   "how late it's getting!");
hungryRabbit.speak("I could use a carrot right now.")

// You can think of 'this' as an extra paramter that is passed in a different way.
// If you want to pass it explicitly, you can use a function's 'call' method, which 
// takes the 'this' value as its first argument, and treats further arguments as normal parameters.

speak.call(hungryRabbit, "Burb!");