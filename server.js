const http = require("http");
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

// server.on('request', (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.write('Hello World\n');
//   response.end();
// });

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {

    let body = [];
    request.on('data', chunk => {
        body.push(chunk.toString());
    });
    request.on('end', () => {
        const name = JSON.parse(body).name;
        const id = new Date()
        const message = {
          name: name,
          id: id
        }
        response.end(JSON.stringify(message));
    });

    // let newMessage = { 'id': new Date() };
    // request.on('data', (data) => {
    //   console.log('data')
    //   newMessage = Object.assign(newMessage, JSON.parse(data));
    //   console.log(newMessage)
    // });
    // request.on('end', () => {
    //   addMessage(newMessage, response);
    // });
  } 
});   

getAllMessages = (response) => {
    response.writeHead(200, {"Content-Type": "application/json"}); 
    response.end(JSON.stringify(messages));
} 
  
// addMessage = (newMessage, response) => { 
//   // console.log(newMessage)
//   response.writeHead(200, {"Content-Type": "application/json"});
//   response.end(JSON.stringify(newMessage));
// }   