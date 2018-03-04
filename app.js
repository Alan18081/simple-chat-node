const WebSocketServer = require('ws').Server;

const clients = {};
const users = [];
const messages = [];

const webSocket = new WebSocketServer({
  port: 8081
});

webSocket.on('connection', ws => {
  const id = new Date().getTime();
  clients[id] = ws;
  ws.on('message', message => {
    const data = JSON.parse(message);
    let newData;
    switch(data.type) {
      case 'user':
        users.push({
          id,
          name: data.name,
          login: data.login
        });
        newData = {
          type: 'user',
          users,
          messages,
          currentUser: users.find(u => u.id === id)
        };
        break;
      case 'message':
        messages.push(data);
        newData = data;
        break;
      case 'image':
        messages.forEach(message => {
          if(message.login === data.login) {
            message.img = data.img;
          }
          return message;
        });
        newData = {
          type: 'image',
          messages
        };
        break;
    }
    for(let key in clients) {
      clients[key].send(JSON.stringify(newData));
    }
  });

  ws.on('close', () => {
    console.log('Connection closed');
    let clientsLength = 0;
    for(let key in clients) {
      clientsLength++;
    }
    delete clients[id];
    if(clientsLength === users.length) {
      const delIndex = users.findIndex(u => u.id === id);
      users.splice(delIndex,1);
      for(let key in clients) {
        clients[key].send(JSON.stringify({
          type: 'user',
          users,
          messages
        }))
      }
    }
  });

  ws.on('error', () => {
    console.log('Error');
  });
});

