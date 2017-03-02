var http = require('http'),
 express = require('express'),
 hostname = 'localhost',
 port = 3000,
 app = express();

app.use(function(req,res,next){
  console.log(req.headers);
  res.writeHead(200, {'Content Type': 'text/html'});
  res.end('<html><body><h1>Hello World!!</h1></body></html>');
});
var server = http.createServer(app);
server.listen(port, hostname, function(){
  console.log(`Server Running on ${hostname}:${port}`);
});
