const { rejects } = require("assert");
const { error } = require("console");
const { resolve } = require("path");

function delayFn(time){
    return new Promise((resolve)=> setTimeout(resolve,time))
}

console.log('Promise lecture start')
delayFn(2000).then(()=> console.log("after 2 seconds promise resolved"));
console.log("end");


function divideFn(num1,num2){
    return new Promise((resolve,rejects)=>{
        if(num2=== 0){
            rejects('can not perform division by 0')
        }
        else{
            resolve(num1/num2)
        }
    })
}

divideFn(10,5)
.then(result=> console.log(result,'res'))
.catch(error=> console.log(error,'err'))


// The keyword return here only returns the Promise object —
// not the division result directly.

// Step 2: Inside the Promise

// resolve(value) → sends back a successful result to .then()
// reject(error) → sends back an error to .catch()
// They don’t print anything — they just pass data to the next part.
// data pass yh khud kr rhe hain