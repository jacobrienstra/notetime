import { css } from "@emotion/react";

const kofiButtonWrap = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

function Thanks(): JSX.Element {
  return (
    <div>
      <h2>Thanks </h2>
      <p>
        I made this on a whim for a good friend, so it's cool others are using
        it too. Please feel free to let me know if you{" "}
        <a
          style={{ color: "var(--blue)" }}
          href="https://docs.google.com/forms/d/1jdEFzNhJifLXGDvmAlfuPcArH4Z_CCm0rnNIWqUXoBQ/"
          target="_blank"
          rel="noreferrer"
        >
          found a bug or would like a new feature
        </a>
        . I'll see what I can do.
      </p>
      <p>
        And if for any reason you want to{" "}
        <a
          href="https://twitter.com/messages/compose?recipient_id=2922787775"
          target="_blank"
          rel="noreferrer"
        >
          say hi
        </a>{" "}
        or say thank you with money, here's a button for that:
      </p>
      <div css={kofiButtonWrap}>
        <a href="https://ko-fi.com/H2H0BZNEN" target="\_blank" rel="noreferrer">
          <img
            height="42"
            src="https://cdn.ko-fi.com/cdn/kofi5.png?v=3"
            alt="Kofi Buy me a Coffee button"
          />
        </a>
      </div>
    </div>
  );
}

export default Thanks;
