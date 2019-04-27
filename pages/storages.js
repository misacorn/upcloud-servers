import React from 'react';
import Head from 'next/head';
import css from 'styled-jsx/css';

import { getStorages } from 'api/storage';
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

  .title {
    font-size: 13px;
    margin: 0 5px 0 0;
  }

  .size {
    font-size: 13px;
    font-weight: 500;
    opacity: 0.5;
    margin: 0;
  }
`;

class Storages extends React.Component {
  state = {
    storages: [],
    status: 'REQUEST',
    message: '',
  };

  componentDidMount() {
    getStorages()
      .then((storages) =>
        this.setState({ storages: storages.data, status: 'SUCCESS' }),
      )
      .catch((err) =>
        this.setState({
          status: 'ERROR',
          message: err.response.data.error.error_message,
        }),
      );
  }

  render() {
    const { storages, status, message } = this.state;

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
                <Card.Head title="Storages" />
              </Card>
              <Card>
                <Card.Content>
                  <ul>
                    {storages.map((storage) => (
                      <li key={storage.title}>
                        <span className="title">{storage.title}</span>
                        <span className="size">
                          (Hostname: {storage.size} GB)
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
              </Card>
            </>
          )}
          {status === 'ERROR' && <div className="error">{message}</div>}
        </main>
      </>
    );
  }
}

export default Storages;
