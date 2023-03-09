// EXERCISES

// 1. Looping a Triangle: 

/* Write a loop that makes seven calls to console.log to output
the following triangle: 
#
##
###
####
#####
######
#######
*/

for (let py = "#"; py.length <= 7; py += "#") {
	console.log(py);
}
// py.length is used as the counter because I'm storing #'s in py
	
//---------------------------------------------------------------

// 2. FizzBuzz

/* Write a program that uses console.log to print all the numbers from 
   1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz"
   instead of the number, and for numbers divisible by 5 (and not 3), print 
   "Buzz" instead. */


for (let count = 1; count <= 100; count++) {
	let p = count
	if (p % 3 == 0) {
		p = "Fizz";
	} else if (p % 5 == 0) {
		p = "Buzz";
	}
	console.log(p)
}

/* When you have that working, modify your program to print "FizzBuzz" for 
   numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" 
   for numbers divisible by only one of those). */

for (count = 1; count <= 100; count++) {
	let number = count;
	if (number % 15 == 0) {
		number = "FizzBuzz";
	} else if (number % 3 == 0) {
		number = "Fizz";
	} else if (number % 5 == 0) {
		number = "Buzz";
	}
	console.log(number);
}
//---------------------------------------------------------------

// 3. Chessboard

/* Write a program that creates a string that represents an 8×8 grid, using 
   newline characters to separate lines. At each position of the grid there 
   is either a space or a "#" character. The characters should form a chessboard. 
   Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #  
*/


let size = 8
let board = ""

for (let row = 0; row < size; row++) {
	for (let cell = 0; cell < size; cell++) {
		if ((row + cell) % 2 == 0) {
			board += " ";
		} else {
			board += "#";
		}
	}
	board += "\n"
}
console.log(board)

//---------------------------------------------------------------

// NOTES

// Show the square of the input only if the input is actually a number.
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
} else {
  console.log("Hey. Why didn't you give me a number?");
}
console.log("is NaN =",Number.isNaN(theNumber))
// Number.isNaN() function must be used because the Number() function converts invalid inputs into NaN, a number type




// Output all even numbers less than 100
let n = 0
while (n < 12) {
	console.log(n)
	n = n + 2
}
// 
// 
// Find 2 to the 10th power
let result = 1;
let counter = 0;
while (counter < 10) {
	result = result * 2;
	counter = counter + 1;
}
console.log(result);




// Rewrite the above as for loop
let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
  result = result * 2;
}
console.log(result);
//
//
// continue asking for an input until a non-empy string is entered 
let yourName;
do {
	yourName = window.prompt("what is your name?");
} while (!yourName);
console.log(yourName);
// do-while loop used to start the prompt immediately. All strings resolve true 




// Rewrite a hypothetical if/else if series as switch
switch (prompt("what is the weather like?")) {
case "rainy":
	console.log("remember to bring an umberella.");
	break;
case "sunny":
	console.log("dress lightly.")
case "cloudy":
	console.log("go outside.");
	break;
default:
	console.log("unknown weather type!");
	break; 
}
// no break 'sunny' case, so it executes accross the 'cloudy' label. 
 


