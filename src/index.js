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
    // console.log(dataInput);
    if (!dataInput) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return
    }

    fetchCountries(dataInput)
        .then(data => {
            console.log(data);
            if (data.length > 10) {
                screenMessage(10);
                countryListEl.innerHTML = '';
                return;
            }
            if (data.length === 1) {
                console.log('1');
                makeMarkupCountryInfo(data);
                
                return;
            }
            if ((data.length > 1) && (data.length <= 10)) {
                makeMarkupCountryList(data);
                
                return;
            }
            
        })

        .catch(error => {
            screenMessage(0);
        });
};

function screenMessage(result) {
    if (result === 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return
    }
    Notify.failure('Oops, there is no country with this name');

}


const clean = element => {
    element.innerHTML = '';
}

function makeMarkupCountryList(data) {
    // let markup = '';
    console.log(data);

    const markup = data.map((country) => 
        `
            <li class='country-list'>
            <img class="country-flag" src="${country.flags.svg}" width="40" height="25">
            <p class="country-name"> ${country.name.official}</p>
            </li>
        `
    ).join('');
    
        countryListEl.innerHTML = markup;
}

function makeMarkupCountryInfo(country) {
    console.log(country);
    // console.log(`${country.name.official}`);
    const markup = ` 
        <img class="country-info" src="${country.flags.png}" width="50" height="50">
        <h1>${country.name}</h1>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${country.languages}</p>
    `;
    console.log(markup);
    countryInfoEl.innerHTML = markup;
};