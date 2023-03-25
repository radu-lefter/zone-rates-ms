import Head from "next/head";
import Title from "../components/Title";
import Zone from "../components/Zone";
import { getZones } from "../lib/zones";

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
      <main className="px-6 py-4">
        <Title>Zone rates</Title>
        <h2>Search by country</h2>
        {/* <ul>
          {countries.map((country) => (
            <li key={country.id}>
              {country.country}
            </li>
          ))}
        </ul> */}
        <h2>Search by zones</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3>Landline zones</h3>
            <div className="grid grid-cols-3 gap-2">
              {zones.land_zones.map((zone, i) => (
                <Zone key={i} zone={zone.zone} />
              ))}
            </div>
          </div>
          <div>
            <h3>Mobile zones</h3>
            <div className="grid grid-cols-3 gap-2">
              {zones.mob_zones.map((zone, i) => (
                <Zone key={i} zone={zone.zone} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
