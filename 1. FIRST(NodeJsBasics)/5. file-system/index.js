// i want to create a folder name data folder comminds are below

const fs = require('fs')//file system
const path = require('path')

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)//will create data folder
    console.log("data folder created");
}

//lets create and write file inside folder
const filePath = path.join(dataFolder, 'example.txt')
//sync way of creating the file
fs.writeFileSync(filePath, 'this creates file and this is the content of file');
console.log('file created successfully')

//now how to read this content
const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File content:", readContentFromFile)


// let see how to append data
fs.appendFileSync(filePath, "\nThis is the newline added to that file")
console.log('new file content is added')


//async way of creating the file
const asyncFilePath = path.join(dataFolder, 'async-example.txt');
fs.writeFile(asyncFilePath, 'hello Async node js', (err) => {
    if (err) throw err;
    console.log('Async file is created');

    fs.readFile(asyncFilePath, "utf8", (err, data) => {
        if (err) throw err;
        console.log("Async file content:", data)


        fs.appendFile(asyncFilePath, "\nThis is another line added", (err) => {
            if (err) throw err;
            console.log("New line added to async file")

            fs.readFile(asyncFilePath, 'utf8', (err, updatedadta) => {
                if (err) throw err;
                console.log('Updated file content', updatedadta)
            });

        });
    });
});