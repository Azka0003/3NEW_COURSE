//how to connect mongoose create schema and 
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Azka003:azka1234@cluster0.cgmuuk9.mongodb.net/')
    .then(() => console.log('database connected successfully'))
    .catch((e) => console.log(e));
//once db connection is successfull next is creating schema

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});


// We are creating a User model (collection) in mongodbatlas.
// This model defines how user data will be stored in the database.
// All users will be saved following schema structure u defined.

// 'User'
// This is the name of the model.
// You can give it any name,
// but it should be meaningful (for example: User, Product, Order).

const User = mongoose.model('User', userSchema)

async function runQueryExamples() {
    try {
        //create the new document for that we have to use model that will provide all methods
        //1st way
        // const newUser = await User.create({
        //     name: 'Updated User',
        //     email: 'updateduser@gmail.com',
        //     age: 75,
        //     isActive: true,
        //     tags: ['developer']
        // });

        //2nd way
        //  const newUser = new User({
        //     name: 'Arshi',
        //     email: 'arshi123@gmail.com',
        //     age: 21,
        //     isActive: true,
        //     tags: ['psychlogist', 'student', 'daughter']
        // });
        // await newUser.save()

        // console.log('Created new user', newUser)

        // const allUsers=await User.find({});
        // console.log(allUsers)
        //if u have to find some specific then can pass that in bracket but leaving blank will return all users in db

        // const getUserOfActiveFalse = await User.find({
        //     isActive:false
        // });
        // console.log(getUserOfActiveFalse)

        // const getUseJohnDoe = await User.findOne({
        //     name: 'Johndoe'
        // })
        // console.log(getUseJohnDoe)
        //we will get only one in output but that one who will meet requiremnts firstly

        // getting data from their id of new user created corresponding
        // const getLastCreatedUserByUserId = await User.findById(newUser._id)
        // console.log(getLastCreatedUserByUserId,"getLastCreatedUserByUserId")

        //We want name email field only no id so we minus id
        // const selectedFields = await User.find().select("name email -_id");
        // console.log(selectedFields)

        //we want limited users say 5 and want to skip first user
        // const limitedUsers = await User.find().limit(5).skip(1);
        // console.log(limitedUsers)

        //now i want user in sorted order by which u want to sort here age -1 indicating descending order if 1 then ascending
        // const sortedUsers = await User.find().sort({age: 1});
        // console.log(sortedUsers)


        //now wants to count
        // const countDocuments = await User.countDocuments({isActive: true})
        // console.log(countDocuments)


        //now wants to delete a user
        // const deletedUser= await User.findByIdAndDelete(newUser._id);
        // console.log('deleted user->',deletedUser);


        //now wants to update user id pass kro then what u want to upadate and then return object 
        //$push is used to add values to an array without overwriting existing data, 
        //whereas $set replaces the field value. With { new: true }, findOneAndUpdate returns the updated document.
        // const updateduser = await User.findByIdAndUpdate(newUser._id, {
        //     $set: { age: 100 }, $push: { tags: 'updated' }
        // }, { new: true })
        // console.log("updated User->",updateduser)

        const updateduser = await User.findOneAndUpdate({ age: 100 }, {
            $set: { age: 150 }, $push: { tags: 'updatedBYMyself' }
        }, { new: true })
        console.log("updated User->", updateduser)

    } catch (e) {
        console.log('Error ->', e);
    } finally {
        await mongoose.connection.close()
    }
}

runQueryExamples();

//connection->schema->model->create document->perform operations on document like find update select limit etc

// 🔍 Why User becomes users in MongoDB?
// When you write:
// const User = mongoose.model('User', userSchema);
// Mongoose automatically:
// Converts model name to lowercase
// Pluralizes it
// So:
// User → user → users
// Isliye tumhare cluster me collection ka naam users dikhta hai.

// 🧠 Examples
// Model Name	  MongoDB Collection
// User	        users
// Person	        people
// Category        categories





// Yeh sirf us user ko laa raha hai jise tumne abhi insert kiya hai, because:
// newUser._id = newly created document ki ID

// ✅ 2. Baaki users ko access karne ke liye unki ID chahiye?
// 👉 Agar tum findById() use karna chahte ho, toh haan — ID deni padegi.
// Example:
// const user = await User.findById("6748feaab9c99e7db1dd7435");

// Toh yeh wahi user dega jiska ID match karega.
// ❗ BUT, important point:
// Agar tumhe ID nahi pata ho, tab bhi baaki saare users ko access kar sakte ho.
// ID required only for findById(), not for other queries.

// ⭐ Ways to Get Other Users WITHOUT ID
// ✔ 1. Get all users
// const allUsers = await User.find({});

// ✔ 2. Get users by condition
// const activeUsers = await User.find({ isActive: true });

// ✔ 3. Get by name
// const travis = await User.findOne({ name: "Travis Doe" });

// ✔ 4. Get multiple users matching something
// const devs = await User.find({ tags: "developer" });

// ✔ 5. Latest user
// const latestUser = await User.findOne().sort({ createdAt: -1 });
// 👍 Kahin bhi ID ki zaroorat nahi.