const lodash = require('lodash')

const names=['sangam','john','azka'];
const capitalize=lodash.map(names,lodash.capitalize);

console.log(capitalize)