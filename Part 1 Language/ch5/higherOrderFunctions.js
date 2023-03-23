
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

//console.log(filter(SCRIPTS, script => script.living));

// This is a standard array method, and can be more easily written as:
//console.log(SCRIPTS.filter(s => s.direction == "ttb"));


// Transforming with Map: The map method transforms an array by applying a function to all of its elements and bilding a new array from the returned values.
function map(array, transform) {
	let mapped = [];
	for (let element of array) {
		mapped.push(transform(element));
	}
	return mapped;
}

// let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
// console.log(map(rtlScripts, d => d.name));

// Summarizing with Reduce


















































