const fs = require('fs')

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file', err)
        return;
    }

    const modifyFileData = data.toUpperCase();
    //file name and file content
    fs.writeFile('output.txt', modifyFileData, (err) => {
        if (err) {
            console.error('Error reading file', err)
            return
        }
        console.log('data written to new file');


        fs.readFile('output.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file', err)
                return;
            }
            console.log(data);
        })
    });
});