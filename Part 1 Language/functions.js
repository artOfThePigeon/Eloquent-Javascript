// Chapter 3. Functions

// EXERCISES

// 1. MINIMUM 
// Write a function min that takes two arguments and returns their minimum.

function min(x, y) {
  if (x < y) return x;
  else return y;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

// 2. RECURSION
/* Here’s a way to define whether a positive whole number is even or odd:
   — Zero is even.
   — One is odd.
   For any other number N, its evenness is the same as N - 2.

  Define a recursive function isEven corresponding to this description. The function 
  should accept a single parameter (a positive, whole number) and return a Boolean. */

function isEven(a) {
  if (a == 0)  return true;
  else if (a == 1) return false;
  else return isEven(a - 2);
  }
// Test it on 50 and 75. See how it behaves on -1. 

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
// console.log(isEven(-1));
// → maximum call stack exceeded

// Why? Can you think of a way to fix this?

function isEvenAgain(a) {
  if (a == 0) return true;
  else if (a == 1) return false;
  else if (a < 0) return isEvenAgain(-a);
  else return isEvenAgain(a - 2);
}

// 3. COUNTING BEANS
/* Write a function countBs that takes a string as its only argument and returns a number 
   that indicates how many uppercase “B” characters there are in the string. */

function countBs(string) {
  let upperBs = 0
  for (let i = 0; i < string.length; i++) {
    if (string[i] == 'B') {
      upperBs += 1
    }
  } return upperBs;
}

console.log(countBs('BBC'))
// → 2

/* Next, write a function called countChar that behaves like countBs, except it takes a 
   second argument that indicates the character that is to be counted (rather than counting 
   only uppercase “B” characters). */

function countChar(string, letter) {
  let total = 0
  for (let i = 0; i < string.length; i++) {
    if (string[i] == letter) {
      total += 1
    }
  } 
  return total;
}

// Rewrite countBs as countCs to make use of this new function.

function countCs(string) {
  return countChar(string, 'C');
}

console.log(countCs('BBC'));
// → 1
console.log(countChar("kakhkeak", "k"));
// → 4


// NOTES

// Outputs quiche recipe

const quiche = function(factor) {
  const ingredient = function(amount, unit, item) {
    let quantity = (factor * amount);
    if (quantity > 1) {
      unit += 's';
    }
    console.log(`${quantity} ${unit} of ${item}`);
  } 
  ingredient(1, 'bag', 'cheese');
  ingredient(4, 'clove', 'garlic');
  ingredient(1, 'package', 'piecrust');
  ingredient(.5, 'bag', 'spinach');
  ingredient(.5, 'tub', 'sourcream');
  ingredient(2, 'cup','eggs (beaten)');
}


// ARROW FUNCTION NOTATION
const power = (base, exponent) => {
 let result = 1;
 for (let count = 0; count < exponent; count++) {
  result *= base;
 }
 return result
}
console.log(2, 10);
//

const square = (x) => {return x * x} 
const square2 = x => x * x 
// If body is a single expression, instead of a block in braces, expression will be returned from function.


const horn = () => {
  console.log("toot");
};
// when arrow func has no params list, it is just an empty set of ()

// OPTIONAL ARGUMENTS
function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}
console.log(minus(10));
// → -10
console.log(minus(10, 5));
// → 5

// DEFAULT PARAMETERS
function powerDefault2(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}
// default value if nothing is entered for second value

// CLOSURE
function wrapValue(n) {
  let local = n;
  return () => local
} 
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
/* wrap1 binds "() => local" and when called as a function wrap1(), accesses and returns local
   binding of 1 */

// Multiply a number by a factor using closure
function multiplier(factor) {
  return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
/* twice stores specific instance of local binding multipler(2) where 2 passes through the factor. 
   merely calling twice shows it has binded "number => number * factor" but calling it as a function 
   twice(5) passes 5 as number param and multiplies it by specific instance of local binding 2. */

// RECURSION #1
function powerAgain(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * powerAgain(base, exponent - 1);
  }
}
console.log(power(2,3));
// → 8
// this example can be explained by returning a string describing what is occuring

function powerEx(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return `${base} times ` + powerEx(base, exponent - 1);
  }
}
console.log(powerEx(2,3));
// → 2 times 2 times 2 times 1

// RECURSION #2
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return find(current + 5, `(${history} + 5)`) ||
             find(current * 3, `(${history} * 3)`);
    }
  }
  return find(1, "1")
}
console.log(findSolution(81));
/* The function find creates a tree using the || and explores each branch until a null is returned. This is because 
   null evaluates falsy in || statements so after exploring the +5 branch until returning null, it traces back to the 
   previous branch then returns the other side, *3. If this returns null, it has to backtrack until it either returns 
   the history or evaluates the original find function null. */

// OPTIMIZE

/* One strategy to optimize this program to find the fastest path would be to implement a breadth-first search algorithm 
   instead of a depth-first search algorithm. The breadth-first search algorithm would explore all possible paths from 1 
   to the target, and keep track of the shortest path it found so far.

   To implement this, we could use a queue to keep track of all the paths that need to be explored. We would start with the 
   path "1", and add all its possible extensions (i.e., adding 5 or multiplying by 3) to the queue. Then we would take the 
   next path from the queue, and repeat the process until we find a path that reaches the target. At each step, we would 
   keep track of the length of the path, and update the shortest path if we find a path that is shorter than the current 
   shortest path.

   Here is an implementation of this algorithm: 
*/


function findFastestSolution(target) {
  let queue = [{ current: 1, history: "1", steps: 0 }];
  let shortestPath = null;

  while (queue.length > 0) {
    let { current, history, steps } = queue.shift();

    if (current == target) {
      if (shortestPath === null || steps < shortestPath.steps) {
        shortestPath = { history, steps };
      }
    } else if (current < target) {
      queue.push({ current: current + 5, history: `${history} + 5`, steps: steps + 1 });
      queue.push({ current: current * 3, history: `${history} * 3`, steps: steps + 1 });
    }
  }

  return shortestPath === null ? null : shortestPath.history;
}
/* This implementation uses an object to keep track of the current number, the history of how we got there, and the number 
   of steps taken so far. We use the shift() method to remove the first path from the queue, and add its possible extensions 
   to the end of the queue. We keep track of the shortest path found so far in the shortestPath variable, and update it if we 
   find a path that is shorter.

   By using breadth-first search, this algorithm will explore all possible paths from 1 to the target in a systematic way, and
   find the shortest path in terms of the number of steps taken. 
*/


// GROWING FUNCTIONS

// Original function shows inventory of cows and chickens with a 0 pad for 3 digits
function printFarmInventory(cows, chickens) {
  let cowString = String(cows);
  while (cowString.length < 3) {
    cowString = "0" + cowString;
  }
  console.log(`${cowString} cows`);
  let chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }
  console.log(`${chickenString} chickens`);
} 

// Now, add pigs. This works, but it is unclear.
function printZeroPaddedWithLabel (number, label) {
  let numberString = String(number);
  while (numberString.length < 3) {
    numberString = '0' + numberString;
  }
  console.log(`${numberString} ${label}`);
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickens");
  printZeroPaddedWithLabel(pigs, "Pigs");
}
printFarmInventory(7, 11, 13)

//  Now, refactor to pick out a "concept" instead of just lifting out the repeated parts.
function zeroPad(number, width) {
  let string = String(number);
  while (string.length < width) {
    string = '0' + string
  }
  return string;
}

function printFarmInventory2(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory2(7, 16, 3)



