
//types, and automatic type conversion

console.log(typeof(0 - '4'))
// number
console.log(typeof(0 + '4'))
// string


console.log(typeof null)
// object
console.log(null * 10)
// 0

console.log(typeof undefined)
// undefined
console.log(null == undefined)
// true
console.log(undefined * 10)
// NaN


//short circuiting logical operators

// when using ||, if the first value evaluates true, 
// it is returned, otherwise the second value is.
// here, NaN evaluates false. 0 is returned.

console.log(0 || false)
console.log('' || false)
console.log(NaN || false)
console.log(null || false)

// returns false. it would return the second value no
// matter what it is because the first value is false
// when converting booleans.

// but if you compare if either null or NaN is false, it is not.
console.log(null == false)
console.log(NaN == false)
// returns false

console.log('' == false)
//returns true



console.log(null != true || false)
//returns true

console.log(null != false || true)
//returns true

console.log(null == undefined || false)
// returns true

console.log(null == false || undefined)
// returns undefined because null == false is false

console.log(''|| null || 5)
// returns 5 


// for the ternary operator, the second value is not
// evaluated unless is has to. 
// below, the console will return 1 instead of throwing
// an error for not defining the string
console.log(true ? 1 : d3asd)
// returns 1



