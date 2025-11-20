🧩 path module

The path module in Node.js helps you work with file and directory paths in a way that works on all operating systems (Windows, macOS, Linux).

🔹 path.dirname(__filename)
Gives the directory name (folder path) of the current file.
console.log(path.dirname(__filename));


🔹 path.basename(__filename)
Gives the file name (last part of the path).

Output:
pathDemo.js

🔹 path.extname(__filename)
Gives the file extension of the current file.
Output:   .js

🔹 path.join(...)
Joins multiple path segments together using the correct separator (/ or \) and removes extra ones.
const joinPath = path.join("/user", "documents", "node", "projects");
console.log(joinPath);
Output:
\user\documents\node\projects
(uses backslashes \ on Windows)
🧠 It automatically fixes extra slashes or missing separators.

Example:

path.join("/user/", "/node", "file.txt");
// → "\user\node\file.txt"

path.join() ONLY joins the path segments you give it.
It does NOT automatically add:
current working directory (CWD)
current file’s directory (__dirname)
absolute path resolution
unless you put those yourself.




🔹 path.resolve(...)
Gives the absolute path (from your current working directory).
const resolvePath = path.resolve("user", "documents", "node", "projects");

If your project is in
C:\Users\Azka\Desktop\node
then output becomes:
C:\Users\Azka\Desktop\node\user\documents\node\projects
🧠 resolve() starts from your current working directory and builds an absolute path.

🔹 path.normalize(...)
Cleans up a messy path — removes . (current dir), .. (parent dir), and fixes slashes.
const normalizePath = path.normalize("/user/.documents/../node/projects");
console.log(normalizePath);


Output:
\user\node\projects

🧠 It makes sure your path is valid and consistent.

🧾 Summary Table
Method	Purpose	Example Output
dirname()	Folder name of current file	C:\Users\Azka\Desktop\node
basename()	File name only	pathDemo.js
extname()	File extension	.js
join()	Combine path parts	\user\documents\node\projects
resolve()	Get absolute path	C:\Users\Azka\Desktop\node\user\documents\node\projects
normalize()	Clean messy path	\user\node\projects