/** servidor.js */
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

const port = 8888;

var mimeTypes = {
    "html": "text/html",
    "css": "text/css",
    "js": "text/javascript",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png",
    "ico": "image/ico"
}

http.createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    
    if(uri == '/')
        uri = './index.html';
    
    var filename = path.join(process.cwd(), uri);
    var fileStream = fs.createReadStream(filename);
    
    fileStream.on('error', (err) => {
        console.log('Arquivo ' + filename + ' não existe');
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 not found!\n');
        res.end();
    })

    fileStream.on('open', () => {
        var mimeType = mimeTypes[path.extname(filename).split('.')[1]];
        res.writeHead(200, {'Content-Type':mimeType});
        fileStream.pipe(res);
    })
}).listen(port);

console.log('Servidor iniciado na porta ' + port);