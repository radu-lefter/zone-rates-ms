import { fetchJson } from "../../lib/api"; 


async function handleCreate(req, res) {
  if (req.method !== "PUT") {
    res.status(405).end();
    return;
  }
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { id, zone, tariff, countries } = req.body;
  const data = {
    data: {
        zone: zone,
        tariff: tariff,
        countries:countries
    }
  }
  console.log(countries)
  try {
    await fetchJson(`http://127.0.0.1:1337/api/zones/${id}`, {
      method: "PUT",
      headers: { 'Authorization': `Bearer ${jwt}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    res
      .status(200)
      .json({
        message: 'zone updated',
      });
  } catch (err) {
    console.log(err)
    res.status(401).end();
  }
}

export default handleCreate;