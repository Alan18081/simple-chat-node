import Handlebars from 'handlebars/dist/handlebars.min';
import 'babel-polyfill';

window.onload = function() {
  VK.init({
    apiId: 6385881
  });

  (async () => {
    await auth();
    const userInfo = await callAPI('users.get',{fields: 'photo_100'});
    const userTemplate = document.querySelector('#user-template').textContent;
    const renderUserInfo = Handlebars.compile(userTemplate);
    document.body.innerHTML += renderUserInfo(...userInfo);

    const friends = await callAPI('friends.get',{
      fields: 'photo_50, online'
    });
    console.log(friends);
    const friendsTemplate = document.querySelector('#friends-template').textContent;
    const renderFriends = Handlebars.compile(friendsTemplate);
    document.body.innerHTML += renderFriends({friends: friends.items});
  })();
};

function auth() {
  return new Promise((resolve,reject) => {
    VK.Auth.login(data => {
      if(data.session) {
        resolve();
      }
      else {
        reject(new Error('Не удалось авторизоваться'));
      }
    },2);
  });
}

function callAPI(method,params) {
  params.v = '5.73';
  return new Promise((resolve,reject) => {
    VK.api(method,params,(data) => {
      if(data.error) {
        reject(data.error);
      }
      else {
        resolve(data.response);
      }
    })
  })
}