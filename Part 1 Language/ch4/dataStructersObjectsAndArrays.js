
// EXERCISES


// 1. The Sum of a Range

// Write a range function that takes 2 arguments, 'start' and 'end', with an optional third that indicates the 'step', and returns an array containing all the numbers from the start up to (and including) end.

function range(start, end, step = start < end ? 1 : -1) {
  let result = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) result.push(i);
  } else {
    for (let i = start; i >= end; i += step) result.push(i);
  }
  return result;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]

/* Notes: 
	I first used 'if(start < end),' which then required Math.abs to prevent an endless loop if you enter a step value that doesn't makse sense.
   This "error catching" is unneeded complexity. The code above avoids endless loops altogether by checking if step > 0. This is because The IF 
   statement should really only check if it should use the count up or count down loop. The check of whether step > 0 is better because that is 
   all the system really needs to know, "should I step up from start to end, or step down." If a negative step is entered, then it counts down, 
   and if the start is less than the end in that case,the loop merely concludes and returns the empty array. 

function rangeDave(start, end, step = 1) {
	let result = [];
	step = Math.abs(step);
	if (start <= end) {
		for (let i = start; i <= end; i += step) result.push(i);
	} else {
		for (let i = start; i >= end; i -= step) result.push(i);
	}
	return result;
}
*/

// Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the example program and see whether it does indeed return 55.

function sum(numbers) {
	let sum = 0
	for (let i of numbers) {
		sum += i;
	}
	return sum;
}
console.log(sum(range(1, 10)));
// → 55


// ------------------------------------------------------------


// 2. Reversing an array

// Arrays have a reverse method that changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.

function reverseArray(array) {
	let newArray = [];
	for (let i of array) newArray.unshift(i);
	return newArray;
}

/* Notes: 
   An alternative to the above would be to iterate starting from the end, and then pushing the array values to the new array

function reverseArrayAlt(array) {
	let newArray = [];
	for (let i = array.length - 1; i >= 0; i--) {
		newArray.push(array[i]);
	}
	return newArray;
}
*/

function reverseArrayInPlace(array) {
	for (let i = 0; i < Math.floor(array.length / 2); i++) {
		let mirror = array[i];
		array[i] = array[array.length - 1 - i];
		array[array.length - 1 - i] = mirror;
	}
	return array;
}

/* Notes:
   Becase I'm swapping the first and last values of the array, I only need to iterate through half the length of the array 
   (otherwise, the swapping would continue even after properly reversed until the original array is returned). I use Math.floor 
   to round down if the array has an odd # of values, because the value in the middle doesn't need to swap with anything. Then,
   the local binding 'mirror' remembers the starting position, so when I replace it with the corresponding swap value (indicated by 
   [array.length - 1 - i]) I can still use it to replace the swap value. The swap value is constructed by taking the length and
   subtracting 1 because arrays are 0-indexed and I want the last value of the array, then subtracting it so it will count backwards
   corresponding to the increment of i. 
 */

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


// ------------------------------------------------------------


// 3. A List

// a. Write a function 'arrayToList' that builds up a list structure when given [1, 2, 3] as argument.  
// b. Also write a 'listToArray' function that produces an array from a list. 
// c. Then add a helper function 'prepend', which takes an element and a list and creates a new list that adds the element to the front of the input list,
// d. And 'nth', which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element:
// e. Also write a recursive version of nth:

// (a.)
function arrayToList(array) {
	let list = null;
	for (let i = array.length - 1; i >= 0; i--) {
		list = {value: array[i], rest: list};
	}
	return list;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}


// (b.)
function listToArray(list) {
	let array = [];
	for (let node = list; node; node = node.rest) {
		array.push(node.value);
	}
	return array;
}

/* Notes:
	The for loop begins with a binding to node, which serves as the loop condition. As long as node evaluates true, meaning it exists, we push its corresponding value binding to the array, then iterate a level deeper.
*/

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]


// (c.)
function prepend(value, list) {
  return {value, rest: list};
}

console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

/* Notes: 
   The function prepend calls itself when used as the list parameter. First, 10 gets binded to the object element, value. Then, list, as the value to the object element rest, calls prepend to create an object and bind 20 to the inner value element, and null to the inner rest.
*/

// (d.)
function nth(list, element) {
	if (!list) return undefined;
	for (let count = 0; count < element; count++) {
		list = list.rest;
	} 
	return list.value
}
/* Notes:
	in order to get the element of a given position, we have to iterate inward 'element' number of times. To do this, we setup a count equal to the position of the first element, 0, then move inward until the count reaches the element position and return the value.
*/

// (e.)
function nthRecursive(list, element) {
	if (!list) return undefined;
	else if (element == 0) return list.value;
	else return nthRecursive(list.rest, element - 1);
}

console.log(nthRecursive(arrayToList([10, 20, 30]), 1));
// → 20

/* Notes:
	In order to accomplish the result as nth, but recursively, we still iterate inward 'element' number of times, but there are 2 main differencs. First, instead of explicitly binding the inner list, we simply pass it as a parameter to the recursive function call. Second, instead of creating a count binding to represent first position of an object element, 0, and then counting up, the recursive function call passes the (N - 1) element and decrements down to 0. When it finally counts down to the 0 position, we have iterated up exactly element number of times.
*/


// ------------------------------------------------------------


// 4. Deep Comparison

// The == operator compares objects by identity. But sometimes you’d prefer to compare the values of their actual properties. Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.

function deepEqual(objA, objB) {
	if (objA === objB) return true;

	if (typeof objA != 'object' || objA == null ||
		 typeof objB != 'object' || objB == null) return false;

	let keysA = Object.keys(objA), keysB = Object.keys(objB);

	if (keysA.length != keysB.length) return false;

	for (let key of keysA){
		if(!keysB.includes(key) || !deepEqual(objA[key], objB[key])) return false;
	}
	return true;
}


// ------------------------------------------------------------


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

/* In order to further filter this to only show correlations greater than 0.1 or less than -0.1:
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
 
// for (let entry of JOURNAL) {
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

// Array of objects
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

//Math Object

// Graphs a random point on a circle using Math.PI. 
/* Math is just the namespace so functions like 'min' or 'max' do not have to be global bindings. Math.random() returns 
   a number between 0 inclusive and 1 exclusive. */
function randomPointOnCircle(radius) {
	let angle = Math.random() * 2 * Math.PI;
	return {x: radius * Math.cos(angle),
			  y: radius * Math.sin(angle)};
}

// To use Math.random() to get a whole number, use Math.floor() to round down, ceil to round up.
console.log(Math.floor(Math.random() * 10));
console.log(Math.ceil(Math.random() * 10));

// Use Math.abs to get absolute value
console.log(Math.abs(-Math.random()));

// Destructuring

/* This takes the previous phi function, but creates bindings for the actual frequency table positions. These are the elements 
   of the array, instead of the indexes of it.
*/
function phi2([n00, n01, n10, n11]) {
	return (n11 * n00 - n10 * n01) /
	  Math.sqrt((n10 + n11) * (n00 + n01) *
	  	         (n01 + n11) * (n00 + n10));
}

// This binds an array of objects to a person variable, then deconstructs the name value to log it in the console. 
let person = [{name: "faraji", age: 23},
	           {name: "smoochie", age: 32}];
for (let i of person) {
	let {name} = {name: i.name}
	console.log(name);
}

// JSON

let string = JSON.stringify({squirrel: false,
									  events: ['weekend', 'peanuts']});
console.log(string);
// → {"squirrel":false,"events":["weekend","peanuts"]}
console.log(JSON.parse(string).events);
// → ['weekend', 'peanuts']



