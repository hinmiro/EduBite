'use strict';

//Setup

const changeButton = document.querySelector('.changeButton');
const submitChange = document.createElement('button');
submitChange.textContent = 'Submit';
const submitDialog = document.createElement('dialog');
submitDialog.classList.add('submitDialog');
const submitInput = document.createElement('input');
submitInput.setAttribute('type', 'text');
submitInput.setAttribute('name', 'submit');
const changeLabel = document.createElement('label');

const closeButton = document.createElement('span');
closeButton.classList.add('close');
closeButton.innerHTML = '&times;';

const ulProfile = document.querySelector('.ulProfile');
const profileForm = document.createElement('form');
profileForm.classList.add('profileForm');

profileForm.appendChild(changeLabel);
profileForm.appendChild(submitInput);
submitDialog.appendChild(closeButton);
submitDialog.appendChild(profileForm);
submitDialog.appendChild(submitChange);
document.body.appendChild(submitDialog);



// events


submitChange.addEventListener('submit', event => {
    event.preventDefault();
    const getInput = submitInput.value;
});

ulProfile.addEventListener('click', event => {
    event.preventDefault();
    submitDialog.style.display = 'flex';
    submitDialog.showModal();

    const field = event.target.id;

    changeLabel.textContent = `${field.toUpperCase()}`;
    submitInput.setAttribute('placeholder', `Type new ${field}`);
});

closeButton.addEventListener('click', () => {
    submitDialog.close();
});



