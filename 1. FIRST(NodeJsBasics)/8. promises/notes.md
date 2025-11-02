🎬 Step 1: You write this
new Promise((resolve) => setTimeout(resolve, 2000))
Let’s imagine this line as you saying to JavaScript:
“Hey JS, create a Promise for me — I’ll tell you when it’s finished.”
So JavaScript replies:
“Okay! Here’s a special function called resolve(). When you call it, I’ll mark your promise as done.”
🧩 Step 2: The function (resolve) => ...
You see this part:
(resolve) => setTimeout(resolve, 2000)
Here:
resolve is automatically given to you by JavaScript.
You don’t make it yourself.
It’s a function you can call later to say: “I’m done!”
🕒 Step 3: setTimeout(resolve, 2000)
Now, this means:
“After 2 seconds, call that resolve() function.”
So after 2 seconds, JS calls it → which marks the promise as resolved ✅.
📦 Step 4: What happens when the promise resolves
When your promise resolves,
the .then() part runs 👇
delayFn(2000).then(() => console.log("after 2 seconds promise resolved"));
So the output comes after 2 seconds.



function delayFn(time){
    return new Promise((resolve)=> setTimeout(resolve,time))
    }
console.log('Promise lecture start')
delayFn(2000).then(()=> console.log("after 2 seconds promise resolved"));
console.log("end");

mtlb return new promise se promise create kr dia yh resolve or reject dega shit o reslve ni to reject
fr jaise yh func confusing h to dekho promise create kra resolve khali pass hua lekin keh dia ki resolve call hoga 2 min baad like ek condi de di fr jb resolve keh dega im done to execute hoga then 