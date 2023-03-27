import Head from "next/head";
import Title from '../components/Title';
import { getZones } from "../lib/zones";
import NavBar from '../components/NavBar';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useRouter } from 'next/router'
import { fetchJson } from "../lib/api";

export async function getStaticProps() {
  
  console.log("[Admin Panel] getStaticProps()");
  const zones = await getZones();
  return { props: { zones }, revalidate: 5 * 60 }; // seconds
}

export default function Home({ zones }) {

  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const response = await fetchJson("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      console.log("sign in:", response);
      router.push('/admin-panel');
    } catch (err) {
      console.log(err)
    } 
  };

  const handleCreate =  () => {
    router.push('/create-zone');
  };

  return (
    <>
      <Head>
        <title>Zone Rates Microservice Admin Panel</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="px-6 py-4 bg-yellow-100 h-screen">
        <Title>Admin Panel</Title>
        <button className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4" onClick={handleCreate}>Create new entry</button>
        <table className="min-w-full text-left text-sm font-light">
          <thead
            className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" className="px-6 py-4">Id</th>
              <th scope="col" className="px-6 py-4">Zone</th>
              <th scope="col" className="px-6 py-4">Tariff</th>
              <th scope="col" className="px-6 py-4">Countries</th>
              <th scope="col" className="px-2 py-4">Edit</th>
              <th scope="col" className="px-2 py-4">Delete</th>
            </tr>
          </thead>
          <tbody>
          {zones.flat.map((zone, i) => (
            <tr key={i}
              className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{zone.id}</td>
              <td className="whitespace-nowrap px-6 py-4">{zone.zone}</td>
              <td className="whitespace-nowrap px-6 py-4">{zone.tariff}</td>
              <td className="whitespace-nowrap px-6 py-4">{zone.countries.join('__')}</td>
              <td className="whitespace-nowrap px-2 py-4"><FaPen /></td>
              <td className="whitespace-nowrap px-2 py-4"><button onClick={()=>{handleDelete(zone.id)}}><FaTrash /></button></td>
            </tr>
             ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
