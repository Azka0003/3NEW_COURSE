// module.exports->export
// require->import

const firstModule = require('./first-module')
//this is similar to import a from './'

console.log(firstModule.add(10, 20));

try {
console.log('trying to divide by zero');
let result=firstModule.divide(0,0)
console.log(result)
} catch (error) {
console.log('Caught an error',error.message)
}


// the error parameter in catch(error) is the object that was thrown (via throw or automatically by JS).
// If no error is thrown, the catch block never runs.