'use strict';

// Login modal
const emailDiv = document.createElement('div');
emailDiv.classList.add('input-group');

const usernameLoginLabel = document.createElement('label');
usernameLoginLabel.setAttribute('for', 'modalUsernameField');
usernameLoginLabel.textContent = 'Username';

const usernameLoginInput = document.createElement('input');
usernameLoginInput.setAttribute('type', 'text');
usernameLoginInput.setAttribute('id', 'modalUsernameField');
usernameLoginInput.setAttribute('name', 'username');
usernameLoginInput.setAttribute('placeholder', 'Username');
usernameLoginInput.style.textAlign = 'center';


emailDiv.appendChild(usernameLoginLabel);
emailDiv.appendChild(usernameLoginInput);


let passwordDiv = document.createElement('div');
passwordDiv.classList.add('input-group');

let passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'modalPasswordField');
passwordLabel.textContent = 'Password';

let passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'modalPasswordField');
passwordInput.setAttribute('name', 'password');
passwordInput.setAttribute('placeholder', 'Password');
passwordInput.style.textAlign = 'center';

passwordDiv.appendChild(passwordLabel);
passwordDiv.appendChild(passwordInput);


let loginModal = document.createElement('dialog');
loginModal.classList.add('loginModal');

let modalContent = document.createElement('div');
modalContent.classList.add('loginModal-content');

let closeButton = document.createElement('span');
closeButton.classList.add('close');
closeButton.innerHTML = '&times;';

let form = document.createElement('form');
form.classList.add('login');



const registerDiv = document.createElement('div');
registerDiv.classList.add('registerDiv');

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('buttonContainer');

const loginButton = document.createElement('button');
loginButton.setAttribute('type', 'submit');
loginButton.setAttribute('id', 'modalLoginButton');
loginButton.setAttribute('name', 'Login');
loginButton.textContent = 'Login';

const registerLabel = document.createElement('label');
registerLabel.textContent = 'Dont have account?';
registerLabel.setAttribute('id', 'registerLabel');


registerDiv.appendChild(registerLabel);
buttonContainer.appendChild(registerDiv);
buttonContainer.appendChild(loginButton);

form.appendChild(emailDiv);
form.appendChild(passwordDiv);
form.appendChild(buttonContainer);

modalContent.appendChild(closeButton);
modalContent.appendChild(form);

loginModal.appendChild(modalContent);

document.body.appendChild(loginModal);

// Register modal

const registerModal = document.createElement('dialog');
registerModal.classList.add('registerModal');

const registerContainer = document.createElement('form');
registerContainer.classList.add('registerContainer');

const usernameDiv = document.createElement('div');
const usernameLabel = document.createElement('label');
usernameLabel.setAttribute('for', 'usernameInput');
usernameLabel.textContent = 'Username';
usernameDiv.appendChild(usernameLabel);

const usernameInput = document.createElement('input');
usernameInput.setAttribute('type', 'text');
usernameInput.setAttribute('name', 'username');
usernameInput.setAttribute('placeholder', 'Username');
usernameDiv.appendChild(usernameInput);

const registerEmailDiv = document.createElement('div');
const regEmailLabel = document.createElement('label');
regEmailLabel.setAttribute('for', 'emailInput');
regEmailLabel.textContent = 'Email';
registerEmailDiv.appendChild(regEmailLabel);

const regEmailInput = document.createElement('input');
regEmailInput.setAttribute('type', 'text');
regEmailInput.setAttribute('name', 'email');
regEmailInput.setAttribute('placeholder', 'Email');
registerEmailDiv.appendChild(regEmailInput);

const registerPassDiv = document.createElement('div');

const registerPassLabel = document.createElement('label');
registerPassLabel.setAttribute('for', 'text');
registerPassLabel.textContent = 'Password';
registerPassDiv.appendChild(registerPassLabel);

const registerPassInput = document.createElement('input');
registerPassInput.setAttribute('type', 'password');
registerPassInput.setAttribute('name', 'password');
registerPassInput.setAttribute('placeholder', 'Password');
registerPassDiv.appendChild(registerPassInput);

const registerButton = document.createElement('button');
registerButton.setAttribute('id', 'registerButton');
registerButton.textContent = 'Register';


registerContainer.appendChild(usernameDiv);
registerContainer.appendChild(registerEmailDiv);
registerContainer.appendChild(registerPassDiv);
registerContainer.appendChild(registerButton);
registerModal.appendChild(closeButton);
registerModal.appendChild(registerContainer);
document.body.appendChild(registerModal);


// Event listeners

registerLabel.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
});

closeButton.addEventListener('click', ()=> {
    registerModal.style.display = 'none';
});

document.getElementById('loginButton').addEventListener('click', function (event) {
    event.preventDefault();
    loginModal.style.display = 'flex';
});

closeButton.addEventListener('click', function () {
    loginModal.style.display = 'none';
});




//Leaflet map

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    const map = L.map('map').setView([60.18, 24.94], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const myPlace = L.icon({
        iconUrl: 'img/gif3.gif',
        iconSize: [60, 60],
        iconAnchor: [25, 50]
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            map.setView([position.coords.latitude, position.coords.longitude], 13);
            L.marker([position.coords.latitude, position.coords.longitude], {icon: myPlace}).addTo(map);
        }, (error) => {
            console.error('Cannot get location', error);
        });
    } else {
        console.log('Location found')
    }
});
