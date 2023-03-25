import Head from 'next/head'
import Title from '../components/Title';
import { getZones } from '../lib/zones';

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const zones = await getZones();
  return { props: { zones },  revalidate: 5* 60,} // seconds 
}

export default function Home({ zones }) {
  console.log(zones)
  return (
    <>
      <Head>
        <title>Zone Rates Microservice</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Zone rates</Title>
        {/* <ul>
          {countries.map((country) => (
            <li key={country.id}>
              {country.country}
            </li>
          ))}
        </ul> */}
      </main>
    </>
  )
}
