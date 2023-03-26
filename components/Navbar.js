import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import { useRouter } from 'next/router'

function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson("/api/user");
        setUser(user);
      } catch (err) {
        // not signed in 
      }
    })();
  }, []);

  const handleSignOut = async () => {
    await fetchJson("/api/logout");
    setUser(undefined);
  };

  const handleAdmin =  () => {
    router.push('/admin-panel');
  };

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Zone rates</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>Logged in as {user.name}</li>
            <li>
              <button onClick={handleAdmin}>Admin</button>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
