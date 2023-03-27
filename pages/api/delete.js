import { fetchJson } from "../../lib/api"; 


async function handleDelete(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).end();
    return;
  }
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { id } = req.body;
  //console.log(jwt)
  try {
    await fetchJson(`http://127.0.0.1:1337/api/zones/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${jwt}` },
    });

    res
      .status(200)
      .json({
        message: 'zone deleted',
      });
  } catch (err) {
    res.status(401).end();
  }
}

export default handleDelete;