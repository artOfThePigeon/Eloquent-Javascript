
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
   combination occured. Data taken from journal.js

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

/* In order to populate the frequency table with a raw data set, the following function can be used. It takes the dataset
   as journal, then creates a table binding as an array. Each index of the array corresponds to the two bit binaries of 
   whether or not the event occurred and if it corresponded with a squirrel transformation. It then checks each object of
   the array (each entry) then increments the index accordingly. So, if neither event nor squirrel happened, it stays at 0.
   If the event happened, it adds 1, and if the squirrel happened it adds 2 for a total of 3. This corresponds to the last
   index of the array, position 3. Then it increments whatever position it found and proceeds with the loop. 
*/ 
function tableFor(event, journal) {
	let table = [0, 0, 0, 0];
	for (let i = 0; i < journal.length; i++) {
		let entry = journal[i], index = 0;
		if (entry.events.includes(event)) index += 1;
		if (entry.squirrel) index += 2;
		table[index] += 1;
	}
	return table;
}

/* In order to isolate each event so we can create a frequency table then get phi, we have to iterate through each entry
   and create an array to store each unique value.
 */
function journalEvents(journal) {
	let events = [];
	for (let entry of journal) {
		for (let event of entry.events) {
			if (!events.includes(event)) {
				events.push(event);
			}
		}
	}
	return events;
}

// ANALYSIS

/* Now that the events can be isolated, we can take each one and create a frequency table, then get its phi. The commented
   code below is added in the index.html
  */

// for (let event of journalEvents(JOURNAL)) {
// 	console.log(entry + ': ' + phi(tableFor(entry, JOURNAL)));
// }

/* To further filter this to only show correlations greater than .1 or less than -.1:
*/

// for (let event of journalEvents(JOURNAL)) {
//   let correlation = phi(tableFor(event, JOURNAL));
//   if (correlation > 0.1 || correlation < -0.1) {
//     console.log(event + ":", correlation);
//   }
// }

/* The result of the above shows strong positive correlation with eating peanuts, and a strong negative correlation with
 brushing teeth. Finally, to see the correlation between eating peanuts and not brushing teeth, we can run the same
 function, having iterated through the data for those 2 points:
*/
 
//  for (let entry of JOURNAL) {
// 	if (entry.events.includes('peanuts') &&
// 		!entry.events.includes('brushed teeth')) {
// 		entry.events.push('peanut teeth');
// 	}
// }
// console.log(phi(tableFor('peanut teeth', JOURNAL)));




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

// Further Arrayology

let todoList = []
function remember(task) {
	todoList.push(task);
}
remember('eat breakfast');
remember('study javascript');
remember('kiss girlfriend');
remember('study javascript');
console.log(todoList);
// → ['eat breakfast', 'study javascript', 'kiss girlfriend', 'study javascript']

function getTask() {
	return todoList.shift();
}
console.log(getTask());
// → eat breakfast

function rememberUrgently(task) {
	todoList.unshift(task);
}
rememberUrgently('push code');
console.log(todoList);
// → ['push code', 'study javascript', 'kiss girlfriend', 'study javascript']

console.log(todoList.indexOf('study javascript'));
// → 1

console.log(todoList.lastIndexOf('study javascript'));
// → 3
// calling the lastIndexsOf method here searches from the last index, so if finds the value at position 3, not 1. 
// Both indexOf and lastIndexOf take an optional second argument that indicates where to start searching.

console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
/* The start index of slice inclusive, the end index is exclusive. When end is not given, slice talks all 
   elements after start. you can ommit the first argument to just copy the array.
*/

function treeBeard(array, index) {
	return array.slice(0, index)
	.concat(array.slice(index + 1));
}
console.log(treeBeard(['a','b','c','d','e'], 2));
// → ["a", "b", "d", "e"]
/* The concat method can be used to glue arrays together to create a new array, similar to what the + operator 
   does for strings.
*/

//Strings and their properties

let message = 'snow listens to the shouting rabbit'
console.log(message.slice(1, 5) + message.slice(6, 8) +
	message.slice(15, 20) + message.slice(21, 24) +
	message.slice(29, 30));
console.log(message.indexOf(" t"));
// → 12
console.log(message.lastIndexOf(" t"));
// → 15
// lastIndexOf can take more than 1 consecutive character
console.log("   dude \n ".trim());
// → dude

console.log(String(7).padStart(3, "0"));
// → 007 

let sentence = 'now is the hour of our discontent';
let words = sentence.split(' ');
console.log(words);
// → ['now', 'is', 'the', 'hour', 'of', 'our', 'discontent']
console.log(words.join('_'));
// → now_is_the_hour_of_our_discontent

console.log('what\'s new pussycat ' + 'whoa '.repeat(3));

let country = 'Croatia'
console.log(country.length);
// → 7
console.log(country[6]);
// → a

// Rest parameters

function max(...numbers) {
	let result = -Infinity;
	for (let number of numbers) {
		if (number > result) result = number
	} 
	return result
}
console.log(max(false, -8, -9, 0));
// → false
/* Here I define any number of parameters to be allowed, then compare the first argument to -Infinity. 
   This becomes the first result binding. For each subsequent number, if it is greater than the resut,
   then it becomes the result. After iterating through all the arguments, the result that is the greatest
   is returned.

   If I changed the parameters to max(q, ...numbers), then called max(100, -8, -9, false), the 100 would not be counted.
*/

// I can use a 3 dot notation to call a function with an array of arguments
let numbers = [7 + 1, 6, 7, 5, 3, 0, 10 - 1]
console.log(max(...numbers));
// → 9

// It's possible to include an array like this along with other arguments
console.log(max(1, ...numbers, 20));
// → 20

// Square bracket array notation also allows the triple dot operator to spread another array into the new array
let breakfast = ['bean', 'burrito'];
console.log(['eat', 'big', ...breakfast, 'soon']);

















