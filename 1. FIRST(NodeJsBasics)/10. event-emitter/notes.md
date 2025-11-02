**💭 1. Meaning of “Custom”**
Custom just means “made by you.”
Node.js already has a built-in EventEmitter class — but you created your own version (your custom emitter) using it.


**class MyCustomEmitter extends EventEmitter**
means 👉 MyCustomEmitter is a child of EventEmitter.
So, before you can use your own code inside it,
you must set up the parent (EventEmitter) by calling: super();

If you don’t call super() first,
JS doesn’t know how to initialize the parent part →
and you’ll get an error:
ReferenceError: Must call super constructor before using 'this'

✅ In short:
super() runs the parent’s setup (EventEmitter’s internal code).
It gives your class the ability to use .on() and .emit().

bina iske parent class use ni kr paoge super call hota:
super() → calling your parent’s constructor (like telling your parent class: “Please set up your system first.”)



When you write:
const myCustomEmitter = new MyCustomEmitter();
a new object is made — that object is what this refers to inside the class.

this.greeting = 'Hello';
means
“Give this new object a property called greeting and set its value to 'Hello'.”

🚫 If you write:
greeting = 'Hello';
→ It just creates a local variable (inside the function) —
not attached to the object.
So that variable disappears after the constructor runs.

✅ But when you write:
this.greeting = 'Hello';
→ You’re adding greeting as a property of the object being created.
So later, you can access it like:

myCustomEmitter.greeting;  // "Hello"

💬 Example to see the difference:
class Test {
  constructor() {
    greeting = 'Hi';         // ❌ local variable
    this.message = 'Hello';  // ✅ object property
  }
}

const t = new Test();
console.log(t.greeting); // ❌ undefined
console.log(t.message);  // ✅ Hello

✅ In short:
greeting = 'Hello' → temporary local variable
this.greeting = 'Hello' → saved inside the object (so you can use it later)


🧱 In normal OOP (like C++ / Java)

We do this:

class Student {
public:
    string name;
    Student(string n) {  // constructor
        name = n;
    }
    void greet() {
        cout << "Hello " << name;
    }
};

int main() {
    Student s("Azka"); // object creation → constructor auto-runs
    s.greet();         // call function using object
}

⚙️ Same idea in JavaScript (Node.js)
class Student {
  constructor(name) {       // constructor runs automatically
    this.name = name;       // store in object
  }

  greet() {                 // normal function (method)
    console.log("Hello " + this.name);
  }
}

const s = new Student("Azka");  // object created → constructor auto-called
s.greet();                      // function called via object