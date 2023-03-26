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
      <main className="px-6 py-4 bg-yellow-100 h-screen">
      <Title className='bg-sky-600 text-white'>Rates for {zone.zone}</Title>
      <table class="min-w-full text-left text-sm font-light">
          <thead
            class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
            <tr>
              <th scope="col" class="px-6 py-4">S/No</th>
              <th scope="col" class="px-6 py-4">Destination</th>
              <th scope="col" class="px-6 py-4">Fee (GBP) </th>
            </tr>
          </thead>
          <tbody>
          {zone.countries.map((country, i) => (
            <tr
              class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{i}</td>
              <td class="whitespace-nowrap px-6 py-4">{country}</td>
              <td class="whitespace-nowrap px-6 py-4">{zone.tariff} per minute</td>
            </tr>
             ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default ZonePage;
