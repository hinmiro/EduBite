'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    const map = L.map('map').setView([60.18, 24.94], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const myPlace = L.icon( {
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
})
