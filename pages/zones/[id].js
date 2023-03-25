import Head from "next/head";
import Title from "../../components/Title";
import { getZone, getZones } from "../../lib/zones";

export async function getStaticPaths() {
  const zones = await getZones();
  return {
    paths: zones.flat.map((zone) => ({
      params: { id: zone.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const zone = await getZone(id);
  return {
    props: { zone },
  };
}

function ZonePage({ zone }) {
  console.log(zone);
  return (
    <>
      <Head>
        <title>Zone Rates</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{zone.zone}</Title>
        {zone.countries.map((country) => (
          <li>{country}</li>
        ))}
      </main>
    </>
  );
}

export default ZonePage;
