// Lycanthrope Log

/* Jacques keeps turning into a squirrel and doesn't know why. To figure it out, he has begun keeping a
   journal of the events that have occurred throughout the day, and whether or not he has turned into a squirrel.
*/

let journal = [];
// Begins with empty journal array, then creates a function to push journal entries.
function addEntry(events, squirrel) {
	journal.push({events, squirrel});
}
addEntry(["work", "touched tree", "pizza", "running",
	      "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", 
	      "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
  		  "beer"], true);

/* This frequency table takes squirrel transformations and pizza events, and displays the number of times the 
   combination occured

   | No squirrel, no pizza 76 | No squirrel, pizza 9 |
   | Squirrel, no pizza 4.    | Squirrel, pizza 1.   |

*/

// Using the above to compute ϕ coefficient
// ϕ = n11 * n00 − n10 * n01 / √ n1• * n0• * n•1 * n•0

function phi(table) {
	return (table[3] * table[0] - table[2] * table[1]) /
	  Math.sqrt((table[2] + table[3]) *
	  			(table[0] + table[1]) *
	  			(table[1] + table[3]) *
	  			(table[0] + table[2]));
}
/* The indices to the table array are representing two-bit binary numbers (in formula), where the leftmost refers to
   the squirrel (true/false) and the rightmost refers to the event variable. so 10 means "yes" squirrel, "no" event 
   (like pizza). Because 10 in binary is 2, we'll store this at index position 2. The n1• means the sum of all 
   measurements where the first variable is true. n•0 refers to sum of all measurements where second variable is false. 
*/
console.log(phi([76, 9, 4, 1]))
// this is a direct transation of phi formula into javascript.



//-----the below is just practice and notes from the examples ------//

// Array play 
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
console.log(listOfNumbers[1]);
console.log(listOfNumbers[4 - 2]);
console.log(listOfNumbers['length']);

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
console.log(sequence.pop());
console.log(sequence);

// Hype of Types
let doh = "Doh";
console.log(typeof doh.length);
// → number
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH

// Weresquirrel 1
let day1 = {
	squirrel: false,
	events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false
console.log(day1.wolf);
// → false

/* Properties whose names aren’t valid binding names or valid numbers have to be quoted.
*/
let descriptions = {
	work: "went to work", 
	"touched tree": "Touched a tree"
}
console.log(descriptions);


// Objects
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("Right" in anObject);
// → true

// Object.keys
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]

// Object.assign
let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);

// array of objects
let journalPrac = [
  {events: ["work", "touched tree", "pizza",
  			"running","television"],
   squirrel: false},
  {events: ["work", "ice cream", "cauliflower",
  	        "lasagna", "touched tree", "brushed teeth"],
   squirrel: false},
  {events: ["weekend", "cycling", "break", "peanuts",
  			"beer"],
   squirrel: true},
   // and so on
];

// Object Mutability
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false
// using the == operator only evaluates true if both objects are precisely the same value. different objects will be false, even with identical properties

object1.value = 15;
console.log(object2.value);
// → 15
// the object 1 and object 2 bindings grasp the same object, so changing object1 changes object2

const score = {visitors: 0, home: 0};
score.visitors = 1
// this is allowed, but the below is not:
// score = {visitors: 1, home: 0}









