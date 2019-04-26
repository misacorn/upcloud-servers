import css from 'styled-jsx/css';

const commonCardStyles = css`
  @import 'rem';

  .Card__Padding {
    padding: rem(20px) rem(20px);
  }
`;

const cardStyles = css`
  @import 'color';

  .Card {
    background-color: color(white);
    border: 1px solid color(grey, card-border);
    box-sizing: border-box;
  }
`;

const cardContentStyles = css`
  @import 'color';
  @import 'rem';

  .Card__Content {
    font-size: 1rem;
    overflow: visible;
    position: relative;

    :global(p) {
      color: color(black);
      font-size: rem(16px);
      letter-spacing: rem(0.6px);
      line-height: rem(30px);
      margin-top: 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const cardHeadStyles = css`
  @import 'color';

  .Card__Head {
    align-items: center;
    border-bottom: 1px solid color(grey, card-border);
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    justify-content: space-between;
    min-height: rem(40px);
    white-space: nowrap;

    h2 {
      font-size: rem(22px);
      font-weight: 400;
      line-height: 1.3;
      margin: 0;
    }
  }
`;

const cardSectionStyles = css`
  @import 'color';
  @import 'rem';

  .Card__Section {
    /* remove the padding created by Card__Content, and apply our own padding so we get a smooth border-top */
    margin: 0 rem(-20px);
    padding: 0 rem(20px);

    /* add separator between sections */
    & + & {
      border-top: 1px solid color(grey, card-border);
      margin-top: rem(20px);
      padding-top: rem(20px);
    }
  }
`;

export {
  cardContentStyles,
  cardHeadStyles,
  cardSectionStyles,
  cardStyles,
  commonCardStyles,
};
