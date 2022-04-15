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

const sidebarRoot = css`
  // Define logo margins and size vars so I can align with icons on the bottom of the sidebar
  --logo-width: 50px;
  --logo-hor-margin: 12px;
  --logo-ver-margin: 10px;
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
  overflow: hidden;

  background: rgb(256 256 256 / 0%);
  border-radius: 0 4px 4px 0;
  transform: translateX(
    calc(-100% + var(--logo-width) + var(--logo-hor-margin) * 2)
  );

  // On exit, we want to move out before we start fading
  transition: transform 0.5s ease-in-out 0s,
    background-color 0.2s ease-in-out 0.5s;

  will-change: transform, opacity, background-color;

  &.open {
    background: rgb(256 256 256 / 100%);
    transform: translateX(0);
    // On enter, we want to fade in and move in at the same time
    transition: background-color 0.1s ease-in-out 0s,
      transform 0.5s ease-in-out 0s;
  }

  // Utility class for any content within the sidebar-content that also needs to fade out (so its not peeking into the collapsed sidebar)
  & .fades {
    opacity: 0;

    transition: opacity 0.5s ease-in-out 0s;

    will-change: opacity;
  }

  &.open .fades {
    opacity: 1;
  }

  & > .content-wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--logo-ver-margin) var(--logo-hor-margin);

    h1 {
      margin: -5px 30px 0 2px;

      cursor: pointer;
    }

    .logo-button {
      align-self: flex-end;

      transform: scale(1);
      cursor: pointer;

      will-change: transform;

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(1);
      }

      img {
        width: var(--logo-width);
      }
    }
  }
`;

// Overlay prevents interaction with main page and focuses sidebar
const overlay = css`
  position: fixed;
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

  will-change: opacity, visibility;

  &.active {
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
    // Using babel's automatic JSX runtime which means I don't have to include react, but it still doesn't like the shorthand <> for fragment
    <Fragment>
      <div
        ref={overlayRef}
        css={overlay}
        className={`${isOpen ? "active" : ""}`}
      />
      <aside css={sidebarRoot} className={`${isOpen ? "open" : ""}`}>
        <header>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-element-to-interactive-role */}
          <h1 role="button" onClick={() => dispatch(closeAllSections())}>
            Settings
          </h1>
          <div
            tabIndex={0}
            role="button"
            className="logo-button"
            onClick={() => dispatch(toggle())}
          >
            <img
              className="logo"
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="Toggle sidebar"
              title="Logo"
            />
          </div>
        </header>
        <Flipper
          flipKey={curSection}
          className="content-wrapper"
          spring={{ stiffness: 120, damping: 20, overshootClamping: false }}
        >
          <Settings />
          <Section
            index={1}
            icon={faCircleQuestion as IconProp}
            content={<ReactMarkdown>{help}</ReactMarkdown>}
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
