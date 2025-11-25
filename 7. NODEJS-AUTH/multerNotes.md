**CLOUDINARY**
how to use cloudinaryy simply make account 
u can see api key etc
install cloudinary npm i cloudinary


whatever u upload will be seen in media library


**MULTER**
store images locally: lot of functionality provided by multer we will see that first install it(npm i multer)

**destination**	 The folder to which the file has been saved	            DiskStorage
**filename**	 The name of the file within the destination	            DiskStorage
**path**	     The full path to the uploaded file	                        DiskStorage

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




**i want to know that i uploded pic to cloudinary and data to db in controller then why we write code (middleware dest or filename code) imagine we dont need andy mimetype check ,im thinking this code is for storing pic in ur folder of ur devide**

👉 Because Cloudinary cannot receive files directly from the browser.
👉 Multer is needed to first read and prepare the file from the request.

Browser
  ↓
Multer → saves file in uploads/
  ↓
Cloudinary → uploads from uploads/
  ↓
MongoDB → stores URL & publicId
  ↓
fs.unlinkSync() → deletes local file


Multer temporarily stores the file on the server so it can be processed and uploaded to Cloudinary. After a successful upload, the local file is removed.

im asking iss multer wale code mein hi hum file ko browser se le rhe hain to vo line konsi h code mein

🔴 The exact line where file is taken from browser
👉 THIS line:
uploadmiddleware.single('image')//single mean srf ek image upload at a time
📌 This is the most important line



🔑 Key concept (MOST IMPORTANT)
👉 File ka data single('image') ke andar nahi hota
👉 File ka data browser ke request ke andar hota hai

Multer sirf us data ko read karta hai

When a user selects an image in the browser and submits the form, the browser sends that image inside the HTTP request body using multipart/form-data, where the file is attached with a field name (for example, image). In the backend, Multer is used as a middleware in the route with uploadMiddleware.single('image'), which tells Multer to look inside the incoming request and extract the file whose field name is image. Multer reads the request stream, gets the file data sent by the browser, temporarily stores it on the server according to the diskStorage configuration (destination and filename), optionally checks the file type and size using fileFilter and limits, and then attaches the processed file information to request(req.file). Because Multer has already handled the file before the controller runs, the controller can directly access the file using req.file without importing Multer again, upload it to Cloudinary using the file path, save the returned URL and public ID in MongoDB, and finally delete the temporary local file.

The file is attached to req.file internally by Multer when uploadmiddleware.single('image') runs in the route middleware.


**what is req.query?**
req.query contains query parameters sent in the URL.

Example URL:
GET /images?page=2&img=5&sortBy=createdAt&sortOrder=asc

Then:
req.query = {
  page: "2",
  img: "5",
  sortBy: "createdAt",
  sortOrder: "asc"
}

⚠️ Values are strings, so we convert them to numbers where needed.