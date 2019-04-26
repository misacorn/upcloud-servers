import React from 'react';
import { default as NextApp, Container, NextAppContext } from 'next/app';
import Layout from 'components/Layout';
import ClientOnly from 'components/ClientOnly';

class App extends NextApp {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        {/* for simplicity, we run everything on client only in this project, ignoring Next.js's SSR */}
        <ClientOnly>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClientOnly>
      </Container>
    );
  }
}

export default App;
