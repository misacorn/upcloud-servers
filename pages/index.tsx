import React from 'react';
import Head from 'next/head';
import Welcome from 'components/Welcome';

const Home = () => (
  <>
    <Head>
      <title>UpCloud</title>
    </Head>
    <main>
      {/* TODO: render servers etc. ? */}
      <Welcome />
    </main>
  </>
);

export default Home;
