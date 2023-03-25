function stripCountry(country) {
    return {
      id: country.id,
      country: country.attributes.country,
    };
  }
  
  export async function getCountries() {
    const response = await fetch('http://127.0.0.1:1337/api/zones');
    const countries = await response.json();
    return countries.data.map(stripCountry);
  }