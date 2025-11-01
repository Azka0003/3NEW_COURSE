console.log('Node module wrapper demo');
console.log('__filename',__filename)
console.log('__dirname',__dirname)

// console.log("hii")

// function add(a,b){
//     return a+b;
// }
// add(10,10)

module.exports.greet=function(name){
    console.log(`Hello ${name}`)
};