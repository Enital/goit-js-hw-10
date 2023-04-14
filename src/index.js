import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryListEl = document.getElementById('country-list');
const countryInfoEl = document.getElementById('country-info');


inputEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

