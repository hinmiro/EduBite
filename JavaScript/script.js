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
registerContainer.setAttribute('method', 'POST');
registerContainer.setAttribute('enctype', 'multipart/form-data');

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

const registerAvatarDiv = document.createElement('div');
const registerAvatarLabel = document.createElement('label');
registerAvatarLabel.setAttribute('type', 'text');
registerAvatarLabel.textContent = 'Profile img';
registerAvatarLabel.classList.add('avatar');

const registerAvatar = document.createElement('input');
registerAvatar.setAttribute('type', 'file');
registerAvatar.setAttribute('id', 'registerAvatar');
registerAvatar.setAttribute('name', 'avatar');
registerAvatar.classList.add('avatar');
registerAvatarDiv.appendChild(registerAvatar);


registerContainer.appendChild(usernameDiv);
registerContainer.appendChild(registerEmailDiv);
registerContainer.appendChild(registerPassDiv);
registerContainer.appendChild(registerAvatarDiv);
registerContainer.appendChild(registerButton);
registerModal.appendChild(closeButton);
registerModal.appendChild(registerContainer);
document.body.appendChild(registerModal);


// Event listeners
registerButton.addEventListener('click', async event => {
    event.preventDefault();
    const username = usernameInput.value;
    const email = regEmailInput.value;
    const password = registerPassInput.value;
    if (!isUsernameTaken(username)) {
        console.log('Username not available');
    }

    const data = {
        body: JSON.stringify({
            "name": usernameInput.value,
            "password": registerPassInput.value,
            "email": regEmailInput
        }),
        methdod: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    }

    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', data);
        const json = await response.json();
        console.log(json);
    } catch (e) {
        console.log('Error ', e);
    }
});

loginButton.addEventListener('click', async event => {
    event.preventDefault();
})

registerLabel.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

document.getElementById('loginButton').addEventListener('click', function (event) {
    event.preventDefault();
    loginModal.style.display = 'flex';
});

closeButton.addEventListener('click', function () {
    loginModal.style.display = 'none';
});


// functions

async function isUsernameTaken(username) {
    try {
        const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/available/:${username}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error', error);
    }
}

async function getRestaurants() {
    const response = await fetch("https://10.120.32.94/restaurant/api/v1/restaurants");
    return await response.json();
}

//Leaflet map

document.addEventListener('DOMContentLoaded', async event => {
    event.preventDefault();
    const restaurants = await getRestaurants();
    console.log(restaurants);
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

    restaurants.forEach(r => {
        const foodPin = L.icon({
            iconUrl: 'img/foodPinni.png',
            iconSize: [100, 100],
            iconAnchor: [50, 70]
        });
        L.marker([r.location.coordinates[1], r.location.coordinates[0]], {icon: foodPin}).addTo(map);
    })
});