import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Fragment, useEffect, useRef, useState } from "react";
import { faCircleQuestion, faHeart } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { close, closeAllSections, toggle } from "../redux/reducers/sidebar";
import Readme from "../README.md";

import Settings from "./Settings";
import Section from "./Section";

const sidebarStyle = css`
  --logo-width: 50px;
  --logo-h-margin: 12px;
  --logo-v-margin: 10px;
  position: fixed;
  display: flex;
  border-radius: 0 4px 4px 0;
  flex-direction: column;
  min-height: 100%;
  max-height: 100%;
  left: 0;
  z-index: 10;
  top: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
  font-family: monospace;
  background: rgba(256, 256, 256, 0);
  transform: translateX(
    calc(-100% + var(--logo-width) + var(--logo-h-margin) * 2)
  );
  transition: transform 0.5s ease-in-out 0s,
    background-color 0.2s ease-in-out 0.5s;

  &.open {
    transform: translateX(0);
    background: rgba(256, 256, 256, 1);
    transition: background-color 0.1s ease-in-out 0s,
      transform 0.5s ease-in-out 0s;
  }
`;

const sidebarContent = css`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  width: 100%;
  flex-grow: 1;
  overflow: hidden;

  & .fades {
    transition: opacity 0.5s ease-in-out 0s;
    opacity: 0;
  }

  .open > & .fades {
    opacity: 1;
  }
`;

const logo = css`
  width: var(--logo-width);
`;

const logoWrap = css`
  align-self: flex-end;
  cursor: pointer;
  transform: scale(1);

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const headerSection = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--logo-v-margin) var(--logo-h-margin);
`;

const header = css`
  margin: -5px 30px 0 2px;
  cursor: pointer;
`;

const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0);
  opacity: 0;
  transition: opacity 0.5s ease-in-out 0s, visibility 0s 0.5s;
  visibility: hidden;

  &.open {
    visibility: visible;
    opacity: 0.5;
    transition: visibility 0s 0s, opacity 0.5s ease-in-out 0s;
  }
`;

function Sidebar(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(Readme)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpen && overlayRef.current?.contains(e.target as Element)) {
        dispatch(close());
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <Fragment>
      <div ref={overlayRef} css={[overlay]} className={`${isOpen && "open"}`} />
      <aside css={[sidebarStyle]} className={`${isOpen && "open"}`}>
        <div css={headerSection}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h1 css={header} onClick={() => dispatch(closeAllSections())}>
            Settings
          </h1>
          <div css={logoWrap} onClick={() => dispatch(toggle())}>
            <img
              css={logo}
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="logo"
            />
          </div>
        </div>
        <div css={sidebarContent}>
          <Settings />
          <Section
            index={1}
            icon={faCircleQuestion as IconProp}
            content={<ReactMarkdown>{content}</ReactMarkdown>}
            title="Help"
          />
          <Section
            index={2}
            icon={faHeart as IconProp}
            iconStyle={css`
              color: var(--red-600);
            `}
            content={
              <Fragment>
                Thanks so much or whatever
                <iframe
                  id="kofiframe"
                  src="https://ko-fi.com/jacobrienstra/?hidefeed=true&widget=true&embed=true&preview=true"
                  style={{
                    border: "none",
                    width: "100%",
                    padding: "4px",
                    // height: "100%",
                    background: "#f9f9f9",
                  }}
                  height="712"
                  title="jacobrienstra"
                />
              </Fragment>
            }
            title="Thanks"
          />
        </div>
      </aside>
    </Fragment>
  );
}

export default Sidebar;