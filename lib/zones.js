
function flattenObjects(array) {
  let newArray = [];
if(array.constructor === Array){
  for (const element of array) {
    let newObject = {};
    newObject.id = element.id;
    newObject.zone = element.attributes.zone;
    newObject.tariff = element.attributes.tariff;
    newObject.countries = element.attributes.countries.split(",");
    newArray.push(newObject);
  }

  return newArray;}else{
    return {
      id: array.data.id,
      zone: array.data.attributes.zone,
      tariff: array.data.attributes.tariff,
      countries: array.data.attributes.countries.split(",")

    }
  }
}

export async function getZone(id) {
  const response = await fetch(`http://127.0.0.1:1337/api/zones/${id}`);
  const zone = await response.json();
  const flat = flattenObjects(zone);
  return flat;
  //return zone;
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

  return {flat, land_zones, mob_zones}
}
