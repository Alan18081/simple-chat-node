import './main.sass';

import Controller from './modules/Controller';

const controller = new Controller();

document.addEventListener('submit', controller.submitHandler);

controller.sendBtn.addEventListener('click', controller.sendMessageHandler);

document.addEventListener('change', e => {
  const item = e.target;
  if(item.id === 'fileInput') {
    controller.fileChangedHandler(item);
  }
});

document.addEventListener('click', e => {
  const item = e.target;
  if(item.id === 'changeImg') {
    controller.renderImageInput();
  }
  else if(item.id === 'fileLoad') {
    controller.addUserImage(controller.userImage);
  }
  else if(item.id === 'fileClose') {
    controller.hideImageInput();
  }
});