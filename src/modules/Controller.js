import Model from './Model';
import View from './View';

class Controller {
  constructor() {

    this.model = new Model();
    this.view = new View();


    this.messagesContainer = document.querySelector('.messages');
    this.userInfoContainer = document.querySelector('.user-info');
    this.usersContainer = document.querySelector('.users');
    this.input = document.querySelector('#inputMessage');
    this.popupContainer = document.querySelector('.popup-wrapper');
    this.sendBtn = document.querySelector('#addMessage');
    this.fileInput = document.querySelector('#fileInput');

    this.model.messageHandler(type => {
      if(type === 'user') {
        this.renderUserProfile();
        this.popupContainer.innerHTML = '';
      }
      this.renderMessages();
    });
    this.renderForm();
  }
  renderForm() {
    this.popupContainer.innerHTML = this.view.render('auth');
  }
  renderImageInput() {
    this.popupContainer.innerHTML = this.view.render('load-avatar');
  }
  renderMessages() {
    this.messagesContainer.innerHTML = this.view.render('messages',{
      messages: this.model.messages
    });
  }
  renderUserProfile() {
    this.renderMessages();
    this.renderUserInfo(this.model.currentUser);
    this.usersContainer.innerHTML = this.view.render('users',{
      size: this.model.users.length,
      users: this.model.users
    });
  }
  renderUserInfo(data) {
    this.userInfoContainer.innerHTML = this.view.render('user-info',data)
  }
  sendMessageHandler = () => {
    const value = this.input.value.trim();
    this.input.value = '';
    if(value) {
      this.model.sendMessage(value);
    }
  };
  submitHandler = e => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      type: 'user',
      name: form.name.value,
      login: form.login.value
    };
    this.model.addUser(JSON.stringify(userData));
  };
  fileChangedHandler(item) {
    const file = item.files[0];
    const reader = new FileReader();
    console.log('File');
    reader.addEventListener('load', () => {
      const image = new Image();
      image.className = 'file__img';
      image.src = reader.result;
      document.querySelector('.file__content').appendChild(image);
      this.userImage = reader.result;
    });

    if(file) {
      reader.readAsDataURL(file);
    }
  }
  addUserImage(src) {
    this.model.addUserImage(src);
    this.renderUserInfo(this.model.currentUser);
    this.popupContainer.innerHTML = '';
  }
  hideImageInput() {
    this.popupContainer.innerHTML = '';
  }
}

export default Controller;