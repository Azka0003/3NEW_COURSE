const EventEmitter = require('events')

const myFirstEmitter=new EventEmitter();

//register a listener
myFirstEmitter.on('greet',(name)=>{
    console.log(`Hello ${name}`)
})

myFirstEmitter.emit("greet","Sangam Mukherjee")

//✅ In short:
// 'greet' → event name (your choice)
// name → data you send along with the event
// Passing data is optional, but event name must match between .on() and .emit().