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
        Let me know if{" "}
        <a
          style={{ color: "var(--red-700)" }}
          href="https://github.com/jacobrienstra/notetime/issues/new?assignees=jacobrienstra&labels=bug&template=something-ain-t-right.md&title="
          target="_blank"
          rel="noreferrer"
        >
          something isn't working
        </a>{" "}
        or if you have a{" "}
        <a
          href="https://github.com/jacobrienstra/notetime/issues/new?assignees=jacobrienstra&labels=enhancement&template=feature-request.md&title="
          target="_blank"
          rel="noreferrer"
        >
          suggestion or request
        </a>
        ! I'll see what I can do.
      </p>
      <p>
        I made this on a whim for a good friend, but if you really appreciate it
        and want to throw a few dollars at me, please stuff them in a rock and
        no-scope me in the open marketplace. Or use Kofi.
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
