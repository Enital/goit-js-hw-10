export function fetchCountries(name) {
    const properties = 'fields=name,capital,population,flags,languages';
    return fetch('https://restcountries.com/v3.1/name/${name}?${properties}')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}



