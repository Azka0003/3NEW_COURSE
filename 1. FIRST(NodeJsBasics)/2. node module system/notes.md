MODULE WRAPPER FUNCTION

1️⃣ Node wraps every module
When Node loads any JS file, it doesn’t just execute it directly.
Instead, it secretly wraps it inside a function like this 👇
(function (exports, require, module, __filename, __dirname) {
   // your entire file content here
});
That’s why __filename and __dirname are available automatically inside every file — Node passes them into that wrapper function.

2️⃣ Execution of wrapper-explorer.js
When you do:
const wrapperExplorer = require('./wrapper-explorer');

Node:
Loads the file wrapper-explorer.js.
Wraps it (as above) and executes it once.
The lines inside it run immediately:

Everything here runs immediately except for what’s inside the function.
That’s because module.exports.greet = function(...) { ... } only defines the function, it doesn’t call it.

“Why only upper part run first, no greet part run?”
✅ Because:
The top console.log statements run immediately when the file loads.
The greet function is only defined, not executed yet.
It runs later, only when you call wrapperExplorer.greet('Sangam Mukherjee')

“Is greet exporting the whole file or just that function?”
✅ Only the greet function is being exported.
The rest of the code (like the console logs and filename prints) runs only once when the file is loaded — but they are not exported.
So:
console.log lines → run immediately when the module is first loaded.
module.exports.greet → becomes available to other files that require() it.



example
File: wrapper-explorer.js
console.log('Node module wrapper demo');
console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log("hii");

function add(a,b){
    return a+b;
}
add(10,10);

module.exports.greet = function(name){
    console.log(`Hello ${name}`);
};

⚙️ What happens when this file runs (directly or through require())
Node executes everything at the top level, line by line.
So:
console.log('Node module wrapper demo');
→ prints
Node module wrapper demo
console.log('__filename', __filename);
→ prints the full file path
__filename C:\Users\abdul\Desktop\NodeJs\3NEW_COURSE\2. node module system\wrapper-explorer.js
console.log('__dirname', __dirname);
→ prints the directory path
__dirname C:\Users\abdul\Desktop\NodeJs\3NEW_COURSE\2. node module system
console.log("hii");
→ prints
hii
function add(a,b){ return a+b; }
→ defines the function (nothing printed)
add(10,10);
→ calls the function but doesn’t print the result (because there’s no console.log)
module.exports.greet = function(name){ ... }
→ defines and exports the function, doesn’t print anything