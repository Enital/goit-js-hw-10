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
        // clean(0);
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return
    }

    fetchCountries(dataInput)
        .then(data => {
            console.log(data);
            if (data.length > 10) {
                screenMessage(10);
                return;
            }
            buildResult(data);
            // if (data.length === 1) {
            //     console.log('1')
            //     makeMarkupCountryInfo(data);
            //     return;
            // }
            // if ((data.length > 1) && (data.length <= 10)) {
            //     // console.log('5');
            //     // makeMarkupCountryList(data);
            //     return;
            // }
            // console.log(data);
            // makeMarkupCountryInfo(data);
        })

        .catch(error => {
            // clean(countryListEl);
            // clean(countryInfoEl);
            // clean(0);
            // countryListEl.innerHTML = '';
            // countryInfoEl.innerHTML = '';
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

// function clean(element) {
//     element.innerHTML = '';
// }
const clean = element => {
    element.innerHTML = '';
}

function makeMarkupCountryList(data) {
    let markup = '';
    console.log(data);

    markup = data.map(country => {
        return `
        <li class='country-list'>
                <img class="country-flag" src="${country.flags.svg}" width="40" height="25">
                <p class="country-name"> ${country.name.official}</p>
        </li>
    `;
    }).join('');

    // console.log(markup);
    countryListEl.innerHTML = markup;
}

function makeMarkupCountryInfo(country) {
    return country.map(country)
    ` 
        <img src="${country.flags.svg}" width="50" height="50">
        <h1>${country.name}</h1>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${country.languages}</p>
    `
}

function buildResult(arrayOfCountries) {
    if (arrayOfCountries.length === 1) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = makeMarkupCountryInfo(country);
    }
    else {
        countryInfoEl.innerHTML = '';
        countryListEl.innerHTML = makeMarkupCountryList(country);
    }
}
// function makeMarkupCountryInfo(arreyOfCountries) {
//   let markupCountryInfo = '';
//   markupCountryInfo= arreyOfCountries.reduce((acc, {capital, population,languages}) => {
//             acc += `
//           <p><span class="title">Capital:</span> ${capital}</p>
//           <p><span class="title">Population:</span> ${population}</p>
//           <p><span class="title">Languages:</span> ${Object.values(languages).join(',')}</p>
//           `
//        return acc 
//      }, '')
//         countryInfo.innerHTML = markupCountryInfo;
// }
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