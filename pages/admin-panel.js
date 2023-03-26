import Head from "next/head";
import Link from 'next/link';
import Title from '../components/Title';
import { getZones } from "../lib/zones";
import NavBar from '../components/NavBar';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

export async function getStaticProps() {
  console.log("[Admin Panel] getStaticProps()");
  const zones = await getZones();
  return { props: { zones }, revalidate: 5 * 60 }; // seconds
}

export default function Home({ zones }) {
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
        <table className="min-w-full text-left text-sm font-light">
          <thead
            class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
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
            <tr
              className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{zone.id}</td>
              <td className="whitespace-nowrap px-6 py-4">{zone.zone}</td>
              <td className="whitespace-nowrap px-6 py-4">{zone.tariff}</td>
              <td className="whitespace-nowrap px-6 py-4">{zone.countries.join('__')}</td>
              <td className="whitespace-nowrap px-2 py-4"><FaPen /></td>
              <td className="whitespace-nowrap px-2 py-4"><FaTrash /></td>
            </tr>
             ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
