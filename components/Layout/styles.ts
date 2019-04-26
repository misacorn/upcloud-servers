import css from 'styled-jsx/css';

const styles = css`
  @import 'rem';

  .app {
    background: #f9f9f9;
    min-height: 100%;
    overflow: hidden;
  }

  .app-header {
    background: #fff;
    padding: 2rem 0;
  }

  .app-logo {
    width: 100px;

    @media (min-width: 400px) {
      width: 200px;
    }
  }

  .app-nav {
    display: flex;
    justify-content: space-around;

    a + a {
      margin-left: rem(10px);
    }
  }
`;

export default styles;
