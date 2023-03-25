function groupBy(arr, property) {
  return arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

function flattenObjects(array) {
  let newArray = [];

  for (const element of array) {
    let newObject = {};
    newObject.id = element.id;
    newObject.country = element.attributes.country;
    newObject.land_zone = element.attributes.land_zone;
    newObject.mob_zone = element.attributes.mob_zone;
    newObject.land_tariff = element.attributes.land_tariff;
    newObject.mob_tariff = element.attributes.mob_tariff;
    newArray.push(newObject);
  }

  return newArray;
}


export async function getZones() {
  const response = await fetch("http://127.0.0.1:1337/api/zones");
  const countries = await response.json();
  const flat = flattenObjects(countries.data);
  const land_zones = groupBy(flat, "land_zone");
  const mob_zones = groupBy(flat, "mob_zone");

  return {land_zones, mob_zones}
}
