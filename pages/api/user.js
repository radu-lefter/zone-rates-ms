import { fetchJson } from '../../lib/api';


async function handleUser(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchJson(`http://127.0.0.1:1337/api/users/me`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (err) {
    res.status(401).end();
  }
}

export default handleUser;