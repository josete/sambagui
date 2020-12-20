const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
var express = require('express');
var loadIniFile = require('read-ini-file');
var app = express();

handlebars.registerPartial('leftbar', fs.readFileSync('./public/templates/leftbar.hbs').toString());
handlebars.registerPartial('files', fs.readFileSync('./public/templates/files.hbs').toString());

app.use(express.static(__dirname + '/public'));

// Declare a route
app.get('/', (req, res) => {
    const confFile = path.join(__dirname, 'smb.conf')
    const shares = loadIniFile.sync(confFile)
    delete shares['global'];
    delete shares['homes'];
    delete shares['printers'];
    delete shares['print$'];
    var dataFiles = []
    Object.keys(shares).forEach(name => {
        dataFiles.push(getFilesInFolder(name,shares[name].path));    
    });    
    //const sharesTitles = {shares:Object.keys(shares)};
    var templateText = fs.readFileSync('./public/templates/main.hbs');
    var template = handlebars.compile(templateText.toString());
    var data = {shares:Object.keys(shares),filesInfo:dataFiles}
    console.log(data);
    var html = template(data);
    res.type('text/html')
    res.send(html);
});

// Run the server!
app.listen(3000, (err) => {
    if (err) {
        process.exit(1);
    }
});

function getFilesInFolder(title,folder){
    try{
        var files = fs.readdirSync(folder);
        var filesData = []
        files.forEach(element => filesData.push({fileName:element,icon:getExtensionIcon(path.extname(element))}));
        return {title:title,filesData:filesData}
    }catch{
        return {};
    }
}

function getExtensionIcon(extension){
    switch(extension){
        case ".avi":
            return "file video outline";
        case ".mkv":
            return "file video outline";
    }
}