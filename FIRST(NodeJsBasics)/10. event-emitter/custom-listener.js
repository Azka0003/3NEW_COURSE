const EventEmitter = require('events')

class MyCustomEmitter extends EventEmitter{
    constructor(){
        super();
        this.greeting='Hello'//like var but not local var
    }

    greet(name)
    {
        this.emit('greetingdd',`${this.greeting},${name}`)//single argumrnt h as ``
    }
}

const myCustomEmitter=new MyCustomEmitter();
myCustomEmitter.on('greetingdd',(input)=>{
    console.log('Greeting event',input)
});

myCustomEmitter.greet('Sangam Mukharjee');







// all basic of nodejs
