import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    event.preventDefault();
    const dataInput = inputEl.value.trim();
    console.log(dataInput);
    if (!dataInput) {
        cleanFunc();
        return
    }

    fetchCountries(dataInput)
        .then(data => {
            console.log(data);
            if (data.length > 10) {
                screenMessage();
                cleanFunc();
                return;
            }
            resultFunc(data);
        })

        .catch(error => {
            errorFunc();
            cleanFunc();
        });
};

function screenMessage() {
    Notify.info('Too many matches found. Please enter a more specific name');
};

function errorFunc() {    
    Notify.failure('Oops, there is no country with this name');
};

function resultFunc(country) {
    if (country.length === 1) {
        cleanFunc();
        countryInfoEl.innerHTML = makeMarkupCountryInfo(country);
    }
    else {
        cleanFunc();
        countryListEl.innerHTML = makeMarkupCountryList(country);
    }
};

function cleanFunc() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
};

function makeMarkupCountryList(data) {
    const markup = data.map((data) => 
        `
            <li class="name-and-flag">
            <img class="country-flag" src="${data.flags.svg}" width="40" height="24">
            <p> ${data.name.official}</p>
            </li>
        `
    ).join('');
    return markup;
};

function makeMarkupCountryInfo(data) {
    const markup = data.map((data) =>
    `
        <div class="name-and-flag">
            <img class="country-flag" src="${data.flags.svg}" width="40" height="24">
            <h1>${data.name.official}</h1>
        </div>
        <p><span class="title">Capital:</span> ${data.capital}</p>
        <p><span class="title">Population:</span> ${data.population}</p>
        <p><span class="title">Languages:</span> ${Object.values(data.languages).join(', ')}</p>
    `
    ).join('');
    return markup;
};