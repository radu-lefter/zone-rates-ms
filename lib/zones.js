
function flattenObjects(array) {
  let newArray = [];

  for (const element of array) {
    let newObject = {};
    newObject.id = element.id;
    newObject.zone = element.attributes.zone;
    newObject.tariff = element.attributes.tariff;
    newObject.countries = element.attributes.countries.split(",");
    newArray.push(newObject);
  }

  return newArray;
}


export async function getZones() {
  const response = await fetch("http://127.0.0.1:1337/api/zones");
  const countries = await response.json();
  const flat = flattenObjects(countries.data);
  const land_zones = flat.filter(zone => {
    return !zone.zone.includes('Mob');
  });
  const mob_zones = flat.filter(zone => {
    return zone.zone.includes('Mob');
  });

  return {land_zones, mob_zones}
}
