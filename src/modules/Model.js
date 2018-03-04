import noImage from '../assets/noImage.png';

class Model {
  constructor() {
    this.initWebSocket();
    this.messages = [];
    this.users = [];
    this.currentUser = null;
  }
  initWebSocket() {
    this.socket = new WebSocket('ws://localhost:8081');

  }
  sendMessage(value) {
    const date = new Date();
    const data = {
      type: 'message',
      text: value,
      name: this.currentUser.name,
      login: this.currentUser.login,
      img: this.currentUser.img,
      date: `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    };
    this.socket.send(JSON.stringify(data));
  }
  messageHandler = (callback) => {
    this.socket.addEventListener('message', e => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case 'user':
            this.users = data.users;
            this.messages = data.messages;
            if(!this.currentUser) {
              this.currentUser = {
                ...data.currentUser,
                img: noImage
              };
            }
            callback('user');
            break;
          case 'image':
            this.messages = data.messages;
            callback('image');
            break;
          default:
            this.messages.push(data);
            console.log(this.messages);
            callback('message');
        }
      });
  };
  addUser(data) {
    this.socket.send(data);
  }
  addUserImage(src) {
    this.currentUser.img = src;
    this.socket.send(JSON.stringify({
      type: 'image',
      img: src,
      login: this.currentUser.login
    }));
  }
}

export default Model;