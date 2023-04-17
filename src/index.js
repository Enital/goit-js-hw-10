import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryListEl = document.getElementById('country-list');
const countryInfoEl = document.getElementById('country-info');


inputEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    event.preventDefault();
    const dataInput = inputEl.value.trim();
    console.log(dataInput);
    if (!dataInput) {
        clean(0);
        return
    }

    fetchCountries(dataInput)
        // .then(console.log('+++'))
        .then(data => {
            if (data.length > 10) {
                screenMessage(1)
            }
            if (data.length === 1) {
                makeMarkupCountryInfo(data)
            }
            else {
                makeMarkupCountryList(data);
            }
        })

        .catch(() => {
            clean(0);
            screenMessage(0);
        })
}

function screenMessage(result) {
    if (result === 1) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return
    }
    Notify.failure('Oops, there is no country with this name');

}

function clean(result) {
    if (result === 0) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
    }
    if (result === 1) {
        countryListEl.innerHTML = '';
    }
    else {
        countryInfoEl.innerHTML = '';
    }
}


function makeMarkupCountryList({ name, flags }) {
    return `
        <li>
                <img src='${flags.png}' alt='${name}' width='40' height='25'>
                <p> ${element.name.official}</p>
            </li>
    `    
}

// function makeMarkupCountriesInfo(country) {
//     return country.map(({ name, flags ))` 
//         <div>
//             <img src="${flags.png}" alt="${name}" width="200" height="100">
//             <h1>${name}</h1>
//             <p>Capital: ${capital}</p>
//             <p>Population: ${population}</p>
//             <p>Languages: ${Object.values(languages)}</p>
//             </div>
//         `
// }

function makeMarkupCountryInfo(arreyOfCountries) {
  let markupCountryInfo = '';
  markupCountryInfo= arreyOfCountries.reduce((acc, {capital, population,languages}) => {
            acc += `
          <p><span class="title">Capital:</span> ${capital}</p>
          <p><span class="title">Population:</span> ${population}</p>
          <p><span class="title">Languages:</span> ${Object.values(languages).join(',')}</p>
          `
       return acc 
     }, '')
        countryInfo.innerHTML = markupCountryInfo;
}
// function makeMarkupCountryInfo(searchResult) {
//   const htmlMarkup = searchResult
//     .map(element => {
//       const capital = element.capital.join(', ');
//       const languages = Object.values(element.languages).join(', ');
//       return `
//         <li>
//         //   <div class="country-title">
//             <img class="country-flag" src="${element.flags.svg}" alt="${element.name.common} flag"/>
//             <p class="country-name">${element.name.official}</p>
//         //   </div>
//           <ul class="country-description">
//             <li class="country-item"><b>Capital:</b>&nbsp;${capital}</li>
//             <li class="country-item"><b>Population:</b>&nbsp;${element.population}</li>
//             <li class="country-item"><b>Language:</b>&nbsp;${languages}</li>
//           </ul>
//         </li>
//       `;
//     })
//     .join('');
//   countryList.innerHTML = htmlMarkup;
// }