**CLOUDINARY**
how to use cloudinaryy simply make account 
u can see api key etc
install cloudinary npm i cloudinary


whatever u upload will be seen in media library


**MULTER**
store images locally: lot of functionality provided by multer we will see that first install it(npm i multer)

**destination**	The folder to which the file has been saved	   DiskStorage
**filename**	The name of the file within the destination	   DiskStorage
**path**	The full path to the uploaded file	               DiskStorage

**DiskStorage** 
The disk storage engine gives you full control on storing files to disk.
There are two options available, destination and filename. They are both functions that determine where the file should be stored.
destination is used to determine within which folder the uploaded files should be stored. 
This can also be given as a string (e.g. '/tmp/uploads'). 
If no destination is given, the operating system's default directory for temporary files is used.

Note: 
You are responsible for creating the directory when providing destination as a function. 
When passing a string, multer will make sure that the directory is created for you.
filename is used to determine what the file should be named inside the folder. 
If no filename is given, each file will be given a random name that doesn't include any file extension.

*Note: Multer will not append any file extension for you, your function should return a filename complete with a file extension.*



✅ Meaning of: “When passing a string, multer will make sure that the directory is created for you.”
It means:
**✔️ If you do this:**
*const upload = multer({ dest: "uploads/" });*
Then Multer khud hi check karega:
Agar folder uploads/ exist nahi karta → Multer automatically create kar dega
Agar folder exists karta hai → Multer simply use karega
👉 You do NOT need to manually create the folder.

**🚫 On the other hand:**
If you use a function like:
*const storage = multer.diskStorage({*
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    }
*});*


Then Multer will NOT create the folder automatically.
Here, YOU must make sure the folder exists.

💡 So final meaning in simple Hindi:
“String doge → Multer will create folder automatically.”
“Function doge → Folder tumhe khud banana padega.”
✔️ Example
1️⃣ Multer auto-creates folder
const upload = multer({ dest: "uploads/" });
2️⃣ You provide destination function
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    }
});
✔ YOU must create folder manually



**mimetype:**
✅ Mimetype = Media Type of the file

mimetype bataata hai file ka type kya hai.
(Ye image hai, video hai, audio hai, doc hai… etc.)

*🔥 Summary in super simple Hindi:*
❌ mimetype automatically filtering nahi karta
✔️ mimetype sirf batata hai file ka type kya hai
✔️ agar tumhe image hi allow karni ho to mimetype check manually likhna padega



Jab browser se koi file upload hoti hai, toh file ka mimetype aata hai.
file.mimetype.startsWith('image')
You are checking this:
"image/jpeg".startsWith("image") → true
"image/png".startsWith("image") → true
"video/mp4".startsWith("image") → false
"application/pdf".startsWith("image") → false

✔️ image word hum log nahi dete
✔️ Yeh browser khud bhejta hai
✔️ Aur Multer bas usko read karta hai



**tell me upload will work or need to provide full directory as not in root diretory**
❗Important Rule
Multer always looks for the path relative to where you run the server.

You are running:
node server.js
from inside:7. NODEJS-AUTH/
So "uploads/" means:
7. NODEJS-AUTH/uploads/
This matches your structure → ✔️ upload will work.

❌ When do you need to give full path?
Only when:
uploads folder is outside the current project
or you run server from a different folder
You aren’t doing that, so no need for full directory path.