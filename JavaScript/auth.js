'use strict';

const loginButton = document.querySelector('#loginButton');

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


const passwordDiv = document.createElement('div');
passwordDiv.classList.add('input-group');

const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'modalPasswordField');
passwordLabel.textContent = 'Password';

const passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'modalPasswordField');
passwordInput.setAttribute('name', 'password');
passwordInput.setAttribute('placeholder', 'Password');
passwordInput.style.textAlign = 'center';

passwordDiv.appendChild(passwordLabel);
passwordDiv.appendChild(passwordInput);


const loginModal = document.createElement('dialog');
loginModal.classList.add('loginModal');

const modalContent = document.createElement('div');
modalContent.classList.add('loginModal-content');

const closeButtonAuthRegister = document.createElement('span');
closeButtonAuthRegister.classList.add('close');
closeButtonAuthRegister.innerHTML = '&times;';


const closeButtonAuthLogin = document.createElement('span');
closeButtonAuthLogin.classList.add('close');
closeButtonAuthLogin.innerHTML = '&times;';

const form = document.createElement('form');
form.classList.add('login');


const registerDiv = document.createElement('div');
registerDiv.classList.add('registerDiv');

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('buttonContainer');

const loginButtonScript = document.createElement('button');
loginButtonScript.setAttribute('type', 'submit');
loginButtonScript.setAttribute('id', 'modalLoginButton');
loginButtonScript.setAttribute('name', 'Login');
loginButtonScript.textContent = 'Login';

const registerLabel = document.createElement('label');
registerLabel.textContent = 'Dont have account?';
registerLabel.setAttribute('id', 'registerLabel');


registerDiv.appendChild(registerLabel);
buttonContainer.appendChild(registerDiv);
buttonContainer.appendChild(loginButtonScript);

form.appendChild(emailDiv);
form.appendChild(passwordDiv);
form.appendChild(buttonContainer);

modalContent.appendChild(closeButtonAuthLogin);
modalContent.appendChild(form);

loginModal.appendChild(modalContent);

document.body.appendChild(loginModal);




registerLabel.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
});

closeButtonAuthRegister.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

closeButtonAuthLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

async function isUsernameTaken(username) {
    try {
        const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/available/${username}`);
        const data = await response.json();
        console.log(data);
        return data.available;
    } catch (error) {
        console.error('Error', error);
    }
}

registerLabel.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'flex';
});


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


registerContainer.appendChild(usernameDiv);
registerContainer.appendChild(registerEmailDiv);
registerContainer.appendChild(registerPassDiv);
registerContainer.appendChild(registerButton);
registerModal.appendChild(closeButtonAuthRegister);
registerModal.appendChild(registerContainer);
document.body.appendChild(registerModal);

registerButton.addEventListener('click', async event => {
    event.preventDefault();
    const username = usernameInput.value;
    const email = regEmailInput.value;
    const password = registerPassInput.value;
    if (!await isUsernameTaken(username)) {
        console.log('Username not available');
    }

    const data = {
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        }),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    }
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', data);
        const json = await response.json();
        console.log(json);
        if (response.ok) registerModal.style.display = 'none';
    } catch (e) {
        console.log('Error ', e);
    }
});


loginButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const userToken = localStorage.getItem('token');
    if (userToken) {
        localStorage.clear();
        loginButton.textContent = 'Login';
        location.reload();

    } else {
        loginModal.style.display = 'flex'
    }
})

//  Event listener for the login button
loginButtonScript.addEventListener('click', async event => {
    event.preventDefault();
    const username = document.querySelector('#modalUsernameField');
    const password = document.querySelector('#modalPasswordField');
    const payload = {
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
    }

    const response = await fetch('https://10.120.32.94/restaurant/api/v1/auth/login', payload);
    if (!response.ok) throw new Error('Invalid login credentials');
    try {
        const data = await response.json();
        const userToken = data.token;
        localStorage.setItem('token', userToken);
        loginModal.style.display = 'none';
        loginButton.textContent = 'Logout';
        location.reload();
    } catch (e) {
        console.error('Parsing error:', e);
    }
});

// Event listener for the logout button
loginButtonScript.addEventListener('click', function (event) {
    event.preventDefault();
    const userToken = localStorage.getItem('token');
    if (userToken) {
        localStorage.clear();
        location.reload();
    } else {
        loginModal.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const userToken = localStorage.getItem('token');
    if (userToken !== null) {
        loginButton.textContent = 'Logout';
    } else {
        loginButton.textContent = 'Login';
    }
});
