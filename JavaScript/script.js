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

const form = document.createElement('form');
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

// Menu

const menuTable = document.querySelector('.menuTable');
const dailyDiv = document.createElement('div');
const weeklyDiv = document.createElement('div');
let dailyMenu = null;
let weeklyMenu = null;
const dailyLink = document.querySelector('#dailyLink');
const weeklyLink = document.querySelector('#weeklyLink');

// Restaurants nearby
const sorts = document.createElement('div');
sorts.classList.add('sorts');
const spanName = document.createElement('span');
const spanDistance = document.createElement('span');
const nearbyTable = document.querySelector('.nearbyRestaurants');
const nameHeader = document.createElement('th');
nameHeader.textContent = 'Name';
const sortHeader = document.createElement('th');
sortHeader.textContent = 'Distance';

// Login
let userToken = null;



// Event listeners
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

loginButton.addEventListener('click', async event => {
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
        userToken = data.token;
        localStorage.setItem('token', userToken);
        loginModal.style.display = 'none';
    } catch (e) {
        console.error('Parsing error:', e);
    }
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

function showRestaurantList(posLat, posLon, restaurants) {
    console.log(posLat, posLon)
    console.log('restaurants:', restaurants);


    restaurants.forEach((r) => {
        const rLat = r.location.coordinates[1];
        const rLon = r.location.coordinates[0];

        const dLat = deg2rad(rLat - posLat);
        const dLon = deg2rad(rLon - posLon);

        // Calculation to get distance in km from point to point with Haversine formula

        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(posLat)) * Math.cos(deg2rad(rLat)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = 6371 * c;

        r.distance = d;
    })



    nameHeader.addEventListener('click', (event) => {
        event.preventDefault();
        const sortedRestaurants = [...restaurants].sort((a, b) =>
        a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim()))
        renderRestaurants(sortedRestaurants);
    });

    sortHeader.addEventListener('click', (event) => {
        event.preventDefault();
        const sortedRestaurants = [...restaurants].sort((a, b) => a.distance - b.distance);
        console.log('sorted:', sortedRestaurants);
        renderRestaurants(sortedRestaurants);
    });

    renderRestaurants(restaurants);
}

function renderRestaurants(restaurants) {
    nearbyTable.innerHTML = '';
    spanName.appendChild(nameHeader);
    spanDistance.appendChild(sortHeader);
    sorts.append(spanName, spanDistance);
    nearbyTable.append(sorts);
    restaurants.forEach((r) => {
        const newRow = document.createElement('tr');
        const name = document.createElement('td');
        const distance = document.createElement('td');
        name.textContent = r.name;
        distance.textContent = `${r.distance.toFixed(2)} km`;
        newRow.append(name, distance);
        nearbyTable.append(newRow);
    })
}


function deg2rad(deg) {
    return deg * (Math.PI/180);
}

async function getUserData(token) {
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/${token}`);
    if (!response.ok) throw new Error(`Http error: ${response.status}`);
    try {
        return await response.json();
    } catch (e) {
        console.error('Parsing error:', e);
    }
}

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

async function getRestaurants() {
    const response = await fetch("https://10.120.32.94/restaurant/api/v1/restaurants");
    return await response.json();
}


async function getMenu(id) {
    console.log(id);

    const daily = await fetch(`https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/en`);
    const dataDaily = await daily.json();
    const weekly = await fetch(`https://10.120.32.94/restaurant/api/v1/restaurants/weekly/${id}/en`);
    const dataWeekly = await weekly.json();
    ;
    dailyMenu = dataDaily.courses;
    weeklyMenu = dataWeekly.days;

    console.log('Daily menu: ', dailyMenu);
    console.log('Weekly menu: ', weeklyMenu)
}

dailyLink.addEventListener('click', event => {
    event.preventDefault();
    menuTable.innerHTML = '';
    setMenuDaily(dailyMenu);
    dailyDiv.style.display = 'flex';
    weeklyDiv.style.display = 'none';
});

weeklyLink.addEventListener('click', event => {
    event.preventDefault();
    menuTable.innerHTML = '';
    setMenuWeekly(weeklyMenu);
    weeklyDiv.style.display = 'flex';
    dailyDiv.style.display = 'none';
});

function setMenuDaily(daily) {
    document.querySelector('.menuTable').innerHTML = '';

    if (daily.length > 0) {
        daily.forEach(item => {
            const newRow = document.createElement('tr');
            const menuItem = document.createElement('td');
            menuItem.textContent = item.name;
            newRow.appendChild(menuItem);
            menuTable.appendChild(newRow);
        });
    } else if (daily.length === 0) {
        const newRow = document.createElement('tr');
        const menuItem = document.createElement('td');
        menuItem.textContent = 'No menu available today';
        newRow.appendChild(menuItem);
        menuTable.appendChild(newRow);
    }
}

function setMenuWeekly(weekly) {
    weekly.forEach(day => {
        const weekDay = document.createElement('th');
        const newRow = document.createElement('tr');
        weekDay.textContent = `${day.date}`;
        newRow.appendChild(weekDay)
        menuTable.appendChild(newRow);
        day.courses.forEach(item => {
            const newRow = document.createElement('tr');
            const meal = document.createElement('td');
            console.log(item.name);
            meal.textContent = item.name;
            newRow.appendChild(meal);
            menuTable.appendChild(newRow);
        })
    });
};

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
        iconAnchor: [25, 50],
        popupAnchor: [5, -30]
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            showRestaurantList(position.coords.latitude, position.coords.longitude, restaurants);
            map.setView([position.coords.latitude, position.coords.longitude], 13);
            L.marker([position.coords.latitude, position.coords.longitude], {icon: myPlace})
                .bindPopup('<b>You are here</b>')
                .addTo(map);
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
            iconAnchor: [50, 70],
            popupAnchor: [0, -35]

        });
        const markerFood = L.marker([r.location.coordinates[1], r.location.coordinates[0]], {icon: foodPin})
            .bindPopup(`<b>${r.name}</b><br>${r.address}<br>${r.city}<br>`)
            .addTo(map);

        markerFood.on('click', async event => {
            menuTable.innerHTML = '';
            await getMenu(r._id);
        })
    })
});
