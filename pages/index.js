import Head from 'next/head'
import Title from '../components/Title';
import { getCountries } from '../lib/zones';

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');
  const countries = await getCountries();
  return { props: { countries } };
}

export default function Home({ countries }) {
  return (
    <>
      <Head>
        <title>Zone Rates Microservice</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Zone rates</Title>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>
              {country.country}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
