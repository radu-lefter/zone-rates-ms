import Head from 'next/head'
import Title from '../components/Title';

export default function Home() {
  return (
    <>
      <Head>
        <title>Zone Rates Microservice</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Zone rates</Title>
        <p>
          [TODO: display products]
        </p>
      </main>
    </>
  )
}
