'use strict';

//Setup
const submitButton = document.querySelectorAll('.submit');
const submitUsername = document.querySelector('#submitUsername');
const submitEmail = document.querySelector('#submitEmail');
const submitPassword = document.querySelector('#submitPassword');
const changeUsername = document.querySelector('#usernameButton');

const closeButton = document.querySelectorAll('.close');

const profileForm = document.createElement('form');
profileForm.classList.add('profileForm');

document.addEventListener('DOMContentLoaded', async event => {
    event.preventDefault();
    const userToken = localStorage.getItem('token');
    if (!userToken) {
        document.querySelector('.content').style.display = 'none';
        document.querySelector('#loginMessage').style.display = 'flex';
    } else {
        document.querySelector('#loginMessage').style.display = 'none';
        const userData = await getProfileData(userToken);
        document.querySelector('#name').textContent = userData.username;
        document.querySelector('#email').textContent = userData.email;
        const favouriteRestaurant = await getRestaurant(userData.favouriteRestaurant);
        document.querySelector('#favoriteRestaurant').textContent = favouriteRestaurant.name;
        await constructAvatar(userData.avatar);
    }
});


// events

changeUsername.addEventListener('click', (event) => {
    event.preventDefault();
    submitUsername.style.display = 'flex';
});

document.querySelector('#emailButton').addEventListener('click', (event) => {
    event.preventDefault();
    submitEmail.style.display = 'flex';
});

document.querySelector('#password').addEventListener('click', (event) => {
    event.preventDefault();
    submitPassword.style.display = 'flex';
})


closeButton.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.target.parentElement.style.display = 'none';
    });
});

submitButton.forEach((button) => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const parent = event.target.parentElement;
        const hidden = parent.querySelector('.hidden');
        const data = parent.querySelector('.userInput');
        const response = await updateUserData(hidden.value, data.value);
        data.value = '';
        location.reload();
    })
})


async function getProfileData(token) {

    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/token`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token},
    });
    if (!response.ok) throw new Error(`Http error: ${response.status}`);
    try {
        return await response.json();
    } catch (e) {
        console.error('Parsing error: ', e);
    }
}

async function postImage(img) {
    const formData = new FormData();
    formData.append('avatar', img);
    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users/avatar', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData
    });
    if (!response.ok) throw new Error(`Http error: ${response.status}`);
    try {
        return await response.json();
    } catch (e) {
        console.error('Parse error:', e);
    }
}

async function updateUserData(target, data) {
    const payload = {};

    switch (target) {
        case 'username':
            payload.username = data;
            break;
        case 'email':
            payload.email = data;
            break;
        case 'password':
            payload.password = data;
            break;
        case 'favorite':
            payload.favorite = data;
            break;
    }

    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Http error: ${response.status}`);
    try {
        console.log('User data updated!')
    } catch (e) {
        console.error('Parsing error:', e);
    }
}


const imageUpload = document.querySelector('#imageUpload');


document.querySelector('#uploadAvatarButton').addEventListener('click', async (event) => {
    event.preventDefault();
    if (window.selectedFile) {
        const response = await postImage(window.selectedFile);
    }
});

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    document.querySelector('#avatar').src = URL.createObjectURL(file);
    window.selectedFile = file;
});


async function constructAvatar(avatar) {
    const imgEle = document.querySelector('#avatar');
    imgEle.src = `https://10.120.32.94/restaurant/uploads/${avatar}`;
}

const getRestaurant = async (id) => {
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/restaurants/${id}`);
    const data = await response.json();
    return data;
}
