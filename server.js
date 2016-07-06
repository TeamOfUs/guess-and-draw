//声明变量
var http = require('http'),
  fs = require('fs'),
  path = require('path'),
  mime = require('mime');

var cache = {};

//错误响应
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

//发送文件数据
function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

//提供静态文件服务
function serverStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}


//创建 HTTP 服务器
var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = 'client/index.html';
  } else {
    filePath = 'client' + request.url;
  }
  var absPath = './' + filePath;
  serverStatic(response, cache, absPath);
});

server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});
