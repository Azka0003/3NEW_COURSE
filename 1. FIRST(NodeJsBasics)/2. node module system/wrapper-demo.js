const wrapperExplorer = require('./wrapper-explorer')

console.log("In wrapper demo.js file");
console.log("__filename in wrapper explorer",__filename);
console.log("__dirname in wrapper explorer",__dirname) ;

wrapperExplorer.greet('Sangam Mukhrjee')




// ✅ Why is __filename and __dirname printing without us importing anything?
// Because Node itself automatically wraps your file before running it.

// You said:
// "we are not loading the file then how wrapper working?"
// But actually → when you run:
// node demo.js


// Node IS loading your file internally, and before executing it, Node does this internally:

// 🔥 Node internally converts your file into this:
// (function (exports, require, module, __filename, __dirname) {
//     console.log('Node module wrapper demo');
//     console.log('__filename', __filename);
//     console.log('__dirname', __dirname);

//     module.exports.greet = function(name){
//         console.log(`Hello ${name}`);
//     }
// });

// Then it calls this function like:

// wrapperFunction(
//     module.exports,
//     require,
//     module,
//     "C:\\folder\\demo.js",
//     "C:\\folder"
// );


// So:
// ✔ __filename and __dirname are given to your file by Node
// ✔ You don’t need to import anything
// ✔ This wrapper is automatic

// ⭐ Why does Node wrap every module?
// To give each module its own:
// ✔ exports
// ✔ require
// ✔ module
// ✔ __filename
// ✔ __dirname

// This protects your variables so that global namespace is not polluted.
// This is why your code:
// console.log('__filename',__filename)
// console.log('__dirname',__dirname)
// prints correctly.

// 💡 Quick Proof
// Try printing the wrapper function:
// console.log(arguments.callee.toString());
// This will show the wrapper (works only in CommonJS, not strict mode).
// 🎯 Final Answer in One Line
// Your file prints __filename and __dirname because Node automatically wraps your entire file in a function 
// and injects these values — even when you don’t write any wrapper or import any module.