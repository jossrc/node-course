const myForm = document.getElementById('form');

const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/api/auth/'
  : 'https://restserver-node-joss.herokuapp.com/api/auth/';

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};

  for (let el of myForm.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + 'login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then(({ message, token }) => {
      console.log({ message, token });
      if (!token) {
        return console.log(message);
      }
      localStorage.setItem('token', token);
      console.log('LocalStorage: ', localStorage.getItem('token'));
      window.location = 'chat.html';
    })
    .catch((err) => {
      console.log(err);
    });
});

function onSignIn(googleUser) {
  // Enviando ID TOKEN
  var id_token = googleUser.getAuthResponse().id_token;
  const data = { id_token };

  fetch(url + 'google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(console.log);
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
