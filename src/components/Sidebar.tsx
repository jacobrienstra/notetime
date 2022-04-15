import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { Flipper } from "react-flip-toolkit";
import { Fragment, useEffect, useRef, useState } from "react";
import { faCircleQuestion, faHeart } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { close, closeAllSections, toggle } from "../redux/reducers/sidebar";
import Helpmd from "../help.md";

import Thanks from "./Thanks";
import Settings from "./Settings";
import Section from "./Section";

const sidebarStyle = css`
  --logo-width: 50px;
  --logo-h-margin: 12px;
  --logo-v-margin: 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;

  font-family: monospace;

  background: rgb(256 256 256 / 0%);
  border-radius: 0 4px 4px 0;
  transform: translateX(
    calc(-100% + var(--logo-width) + var(--logo-h-margin) * 2)
  );

  transition: transform 0.5s ease-in-out 0s,
    background-color 0.2s ease-in-out 0.5s;

  &.open {
    background: rgb(256 256 256 / 100%);
    transform: translateX(0);

    transition: background-color 0.1s ease-in-out 0s,
      transform 0.5s ease-in-out 0s;
  }
`;

const sidebarContent = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  & .fades {
    opacity: 0;

    transition: opacity 0.5s ease-in-out 0s;
  }

  .open & .fades {
    opacity: 1;
  }
`;

const logo = css`
  width: var(--logo-width);
`;

const logoWrap = css`
  align-self: flex-end;

  transform: scale(1);
  cursor: pointer;

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
  align-items: center;
  justify-content: space-between;
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
  z-index: 1;

  width: 100%;
  height: 100%;
  max-height: 100%;

  background: rgb(0 0 0);
  visibility: hidden;
  opacity: 0;

  transition: opacity 0.5s ease-in-out 0s, visibility 0s 0.5s;

  &.open {
    visibility: visible;
    opacity: 0.5;

    transition: visibility 0s 0s, opacity 0.5s ease-in-out 0s;
  }
`;

function Sidebar(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const curSection = useSelector(
    (state: RootState) => state.sidebar.curSection
  );

  const [help, setHelp] = useState("");

  useEffect(() => {
    fetch(Helpmd)
      .then((res) => res.text())
      .then((text) => setHelp(text));
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
        <header css={headerSection}>
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
        </header>
        <Flipper
          flipKey={curSection}
          css={sidebarContent}
          spring={{ stiffness: 120, damping: 20, overshootClamping: false }}
        >
          <Settings />
          <Section
            index={1}
            icon={faCircleQuestion as IconProp}
            content={
              <ReactMarkdown
                css={css`
                  font-size: 18px;
                `}
              >
                {help}
              </ReactMarkdown>
            }
            title="Help"
          />
          <Section
            index={2}
            icon={faHeart as IconProp}
            iconStyle={css`
              color: var(--red-600);
            `}
            content={<Thanks />}
            title="Thanks"
          />
        </Flipper>
      </aside>
    </Fragment>
  );
}

export default Sidebar;
