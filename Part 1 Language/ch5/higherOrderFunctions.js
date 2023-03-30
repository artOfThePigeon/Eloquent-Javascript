
// Chapter 5: Higher-Order Functions


// Abstracting repetition

// It is common for a program to do something a given number of times, such as this for loop:
for (let i = 0; i < 10; i++) {
	console.log(i);
}

// Can we abstract "doing something N times" as function?
function LogN(n) {
	for (let i = 0; i < n; i++) {
		console.log(i)
	}
}

// But what if we wanted to do something other than logging the number? Since "doing something" can he represented as a function and functions are just values, we can pass our action as a function value:
function repeat(n, action) {
	for (let i = 0; i < n; i++) {
		action(i);
	}
}

repeat(3, console.log);
// → 0
// → 1
// → 2

// We don't have to pass a predefined function to repeat. Often it is easier to create a function value on the spot instead.
let labels = [];
repeat(5, i => {
	labels.push(`Unit: ${i + 1}`);
});


// Higher Order Functions: Functions that operate on other functions, either by taking them as arguments or returning them.


// This function creates a new function.
function greaterThan(n) {
	return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(20));

// This function changes another function. 
function noisy(f) {
	return (...args) => {
		console.log('calling with', args);
		let result = f(...args);
		console.log('called with', args, ', returned', result );
		return result;
	};
}
noisy(Math.min)(3,2,1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1

// This function provides a new type of control flow, using the repeat() functoin defined earlier.
function control(test, then) {
	if(!test) then()
}

repeat(3, n => {
	control(n % 2 == 1, () => {
		console.log(n, 'is even');
	});
});

// forEach built in array method, provides something like a for/of loop as a higher order function
["A", "B"].forEach(l => console.log(l));


function forEach(array, f) {
	for (let l of array) f(l);
}
let array = ["C", "D"];
forEach(array, n => console.log(n));


// Filtering Arrays

// This iterates through elements of an array, and a creates a new array with the elements that pass the test.
function filter(array, test) {
	let passed = [];
	for (let element of array) {
		if(test(element)) {
			passed.push(element);
		}
	}
	return passed;
}

console.log(filter(SCRIPTS, script => script.living));

// This is a standard array method, and can be more easily written as:
console.log(SCRIPTS.filter(s => s.direction == "ttb"));


// Transforming with Map: The map method transforms an array by applying a function to all of its elements and building a new array from the returned values.
function map(array, transform) {
	let mapped = [];
	for (let element of array) {
		mapped.push(transform(element));
	}
	return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, d => d.name));

// Summarizing with Reduce

// Builds a value by repeatedly taking a single element from the array, and combining it with the current value.
function reduce(array, combine, start) {
	let current = start;
	for (let element of array) {
		current = combine(current, element);
	}
	return current;
}

// The standard reduce method will take the first element of the array as its start value and start reducing at the second element.
console.log([1, 2, 3, 4].reduce((a, b) => a + b));

// To use reduce twice to find the script with the most characters:
function characterCount(script) {
	return script.ranges.reduce((count, [from, to]) => {
		return count + (to - from);
	}, 0);
}
// this looks through ranges, which is an array of arrays. Count
// is the accumulator, while [from, to] represent the range of 
// unicode characters. It then subtracts the range and adds it to the accumulator.

console.log(SCRIPTS.reduce((a, b) => {
	return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
// This calls reduce, and passes the values of the array ranges through the ternary operator.


// This is how the previous example would have been written without higher order functions
let biggest = null;
for(let script of SCRIPTS) {
	if (biggest == null ||
		characterCount(biggest) < characterCount(script)) {
		biggest = script;
	}
}
// The characterCount function reduces the ranges assigned to a script by summing their sizes. Note the use of destructuring in the paramter list of reduce.


//Higher order functions start to shine when you need to "compose" operations.

function average(array) {
	return array.reduce((a, b) => a + b) / array.length;
}
// The average function returns the value after an array is reduced, having added each subsequent value then divided by the array's length

// This shows the average year of origin for living scripts by first calling the filter method to find the living langauges, then creating a new array using map with only the year.
console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1165

// This shows the average year of origin for dead scripts by simply negating s.living, which filters for boolean false values.
console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 204

// The above calculation can also be written as one big loop, though less ideal because intermediate results arent represented as coheerent values.
let total = 0, count = 0;
for (let script of SCRIPTS) {
	if (script.living) {
		total += script.year;
		count += 1;
	}
}
console.log(Math.round(total / count));
// → 1165
// The main difference between the 2 is what the computer is doing. The first will build new arrays using filter and map. its more readable but performs more computations. 

// Strings and Character Codes

// to figure out what script a piece of text is using:
function characterScript(code) {
	for (let script of SCRIPTS) {
		if (script.ranges.some(([from, to]) => {
			return code >= from && code < to;
		})) {
			return script;
		}
	}
	return null;
}
// the 'some' method is another higher order function. It takes a test function and
// tells you whether that function returns true for any of the elements in the array










