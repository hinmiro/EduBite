'use strict';


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


//let userToken = null;


// functions

const restaurantsInOrder = (posLat, posLon, restaurants) => {
    restaurants.forEach(r => {
        const rLat = r.location.coordinates[1];
        const rLon = r.location.coordinates[0];
        const dLat = deg2rad(rLat - posLat);
        const dLon = deg2rad(rLon - posLon);

        // Calculation to get distance in km from point to point with Haversine formula

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(posLat)) * Math.cos(deg2rad(rLat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        r.distance = 6371 * c;
    });
}

function showRestaurantList(posLat, posLon, restaurants) {
    console.log(posLat, posLon)
    console.log('restaurants:', restaurants);
    restaurantsInOrder(posLat, posLon, restaurants);


    nameHeader.addEventListener('click', (event) => {
        event.preventDefault();
        const sortedRestaurants = [...restaurants].sort((a, b) =>
            a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim()))
        renderRestaurants(sortedRestaurants);
    });

    sortHeader.addEventListener('click', (event) => {
        event.preventDefault();
        const sortedRestaurants = sortByDistance(restaurants);
        renderRestaurants(sortedRestaurants);
    });

    renderRestaurants(restaurants);
}

const sortByDistance = (restaurants) => {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
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
    return deg * (Math.PI / 180);
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
}

//Leaflet map

const favorite = document.createElement('img');
document.body.appendChild(favorite);

document.addEventListener('DOMContentLoaded', async event => {
    event.preventDefault();
    const restaurants = await getRestaurants();
    console.log(restaurants);

    const map = L.map('map', {
        maxBounds: [
            [-90, -180],
            [90, 180]
        ],
        center: [60.18, 24.94],
        zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const myPlace = L.icon({
        iconUrl: 'img/ukko2.png',
        iconSize: [50, 50],
        iconAnchor: [45, 50],
        popupAnchor: [-20, -50]
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
    const foodPin = L.icon({
        iconUrl: 'img/marker2.png',
        iconSize: [35, 50],
        iconAnchor: [25, 30],
        popupAnchor: [0, -35]

    });

    const highlightIcon = L.icon({
        iconUrl: 'img/foodPinni.png',
        iconSize: [100, 100],
        iconAnchor: [60, 60],
        popupAnchor: [-10, -40]
    });

    navigator.geolocation.getCurrentPosition((pos) => {
        restaurantsInOrder(pos.coords.latitude, pos.coords.longitude, restaurants);
        const restaurantsByDistance = sortByDistance(restaurants);
        const nearestRestaurant = restaurantsByDistance[0];
        restaurantsByDistance.forEach(r => {
            const icon = r === nearestRestaurant ? highlightIcon : foodPin;
            const markerFood = L.marker([r.location.coordinates[1], r.location.coordinates[0]], {icon: icon})
                .bindPopup(`
            <b>${r.name}</b>
            <br>${r.address}
            <br>${r.city}
            <br>${r.phone}
            <br><img src="img/starNoBg.png" id="favoriteIcon" alt="Favorite"/>`)
                .addTo(map);


            markerFood.on('popupopen', async (event) => {
                event.preventDefault();
                document.querySelector('#favoriteIcon').addEventListener('click', async (event) => {
                    event.preventDefault();
                    const payload = {
                        favouriteRestaurant: r._id
                    };
                    console.log(payload);
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
                        const json = response.json();
                        console.log(json);
                        console.log('User data updated');
                    } catch (e) {
                        console.error('Parse error', e);
                    }
                });
            });

            markerFood.on('click', async event => {
                event.preventDefault();
                menuTable.innerHTML = '';
                await getMenu(r._id);
            })
        })

    })
});
