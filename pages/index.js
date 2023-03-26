import Head from "next/head";
import Zone from "../components/Zone";
import Link from 'next/link';
import Title from '../components/Title';
import { getZones } from "../lib/zones";
import NavBar from '../components/NavBar';

export async function getStaticProps() {
  console.log("[HomePage] getStaticProps()");
  const zones = await getZones();
  return { props: { zones }, revalidate: 5 * 60 }; // seconds
}

export default function Home({ zones }) {
  console.log(zones);
  return (
    <>
      <Head>
        <title>Zone Rates Microservice</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="px-6 py-4 bg-yellow-100 h-screen">
        <Title>Zone rates</Title>
        <h2>Search for Rate by Country</h2>
        <p>
          To make life easier, we've grouped countries into simple Zones - you
          can search either by country or view the all the destinations in a
          charging zone.{' '}
        </p>

        <h2 className='bg-sky-600 text-white'>Search for Destinations by Zone</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className='text-center'>
            <h3>Landline zones</h3>
            <div className="grid grid-cols-3 gap-2">
              {zones.land_zones.map((zone) => (
                 <Link key={zone.id} href={`/zones/${zone.id}`}>
                <Zone  zone={zone.zone} tariff={zone.tariff}/>
                </Link>
              ))}
            </div>
          </div>
          <div className='text-center'>
            <h3>Mobile zones</h3>
            <div className="grid grid-cols-3 gap-2">
              {zones.mob_zones.map((zone) => (
                <Link key={zone.id} href={`/zones/${zone.id}`}>
                <Zone zone={zone.zone} tariff={zone.tariff}/></Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
