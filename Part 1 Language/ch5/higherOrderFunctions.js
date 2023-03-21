
// Chapter 5: Higher-Order Functions


// Abstracting repetition

// It is common for a program to do something a given number of times, such as this for loop:
for (let i = 0; i < 10; i++) {
	console.log(i);
}

// Can we abstract "doing something N times" as function?
function repeatLog(n) {
	for (let i = 0; i < n; i++) {
		console.log(i);
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
	labels.push(`Unit ${i + 1}`);
});
console.log(labels);