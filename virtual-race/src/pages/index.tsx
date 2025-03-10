import Head from 'next/head';
import ExampleApiComponent from '@/components/ExampleApiComponent';

export default function Home() {
  return (
    <>
      <Head>
        <title>F1 Race Visualiser</title>
        <meta name="description" content="F1 Race Visualiser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <ExampleApiComponent />
      </main>
    </>
  );
}
