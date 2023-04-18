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
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return
    }

    fetchCountries(dataInput)
        .then(data => {
            console.log(data);
            // console.log('then');
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name');
                // screenMessage;
                return;
            }
            resultFunc(data);
        })

        .catch(error => errorFunc);
};

function screenMessage() {
    Notify.info('Too many matches found. Please enter a more specific name');
};

function errorFunc() {    
    Notify.failure('Oops, there is no country with this name');
};

function resultFunc(country) {
    if (country.length === 1) {
        countryInfoEl.innerHTML = makeMarkupCountryInfo(country);
    }
    else {
        countryListEl.innerHTML = makeMarkupCountryList(country);
    }
}

function makeMarkupCountryList(data) {
    // let markup = '';
    // console.log(data);

    const markup = data.map((data) => 
        `
            <li style="list-style: none">
            <img src="${data.flags.svg}" width="40" height="25">
            <p> ${data.name.official}</p>
            </li>
        `
    ).join('');
    return markup;
}

function makeMarkupCountryInfo(data) {
    console.log('!!!')
    // console.log(country);
    // console.log(`${country.name.official}`);
    const markup = data.map((data) =>
    `
        <img src="${data.flags.svg}" width="50" height="50">
        <h1>${data.name.official}</h1>
        <p>Capital: ${data.capital}</p>
        <p>Population: ${data.population}</p>
        <p>Languages: ${data.languages}</p>
    `
    ).join('');
    console.log('x',markup);
    return markup;
};