import React from 'react';
import Head from 'next/head';
import css from 'styled-jsx/css';

import { getServers } from 'api/server';
import Loader from 'components/Loader';
import Card from 'components/Card';

const styles = css`
  @import 'color';

  main {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    min-height: 500px;
  }

  .error {
    color: color(ui, red);
  }

  .Server__Card {
    display: flex;
    align-items: center;

    .success,
    .alert {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin: 0 10px;
    }

    .success {
      background: color(ui, green);
    }

    .otherState {
      background: color(ui, yellow);
    }

    .alert {
      background: color(ui, red);
    }

    .info {
      display: flex;
      flex-direction: column;
      height: 40px;

      h2 {
        font-size: 15px;
        font-weight: 500;
        margin: 0;
        padding-bottom: 5px;
      }

      h3 {
        font-size: 11px;
        font-weight: 300;
        opacity: 0.5;
        margin: 0;
      }
    }
  }
`;

class Home extends React.Component {
  state = {
    servers: [],
    status: 'REQUEST',
    message: '',
  };

  componentDidMount() {
    getServers()
      .then((servers) =>
        this.setState({ servers: servers.data, status: 'SUCCESS' }),
      )
      .catch((err) =>
        this.setState({
          status: 'ERROR',
          message: err.response.data.error.error_message,
        }),
      );
  }

  render() {
    const { servers, status, message } = this.state;

    return (
      <>
        <style jsx>{styles}</style>
        <Head>
          <title>UpCloud</title>
        </Head>
        <main>
          {status === 'REQUEST' && <Loader />}
          {status === 'SUCCESS' && (
            <>
              <Card>
                <Card.Head title="Servers" />
              </Card>
              {servers.map((server) => (
                <Card key={server.hostname}>
                  <Card.Content>
                    <div className="Server__Card">
                      <div
                        className={
                          server.state === 'stopped'
                            ? 'alert'
                            : server.state === 'started'
                            ? 'success'
                            : 'otherState'
                        }
                      />
                      <div className="info">
                        <h2>{server.title}</h2>
                        <h3>Hostname: {server.hostname}</h3>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </>
          )}
          {status === 'ERROR' && <div className="error">{message}</div>}
        </main>
      </>
    );
  }
}

export default Home;
