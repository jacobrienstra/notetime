import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { toggle, setOrderReverse, close } from "../redux/reducers/settings";

const sidebarStyle = css`
  --logo-width: 50px;
  --logo-margin: 12px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  border-radius: 0 4px 4px 0;
  overflow-x: hidden;
  box-sizing: border-box;
  font-family: monospace;
  background: rgba(256, 256, 256, 0);
  transform: translateX(
    calc(-100% + var(--logo-width) + var(--logo-margin) * 2)
  );
  transition: transform 0.5s ease-in-out 0s,
    background-color 0.2s ease-in-out 0.3s;

  &.open {
    transform: translateX(0);
    background: rgba(256, 256, 256, 1);
    transition: background-color 0.1s ease-in-out 0s,
      transform 0.5s ease-in-out 0s;
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
  padding: 10px var(--logo-margin);
`;

const settingsSection = css`
  height: 100%;
  padding: 6px 24px 24px 24px;
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  transition: opacity 0.5s ease-in-out 0s;
  opacity: 0;

  .open > & {
    opacity: 1;
  }
`;

const header = css`
  font-size: 42px;
  margin: -5px 30px 0 2px;
`;

const option = css`
  margin-bottom: 30px;
`;

const optionTitle = css`
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-weight: 700;
  color: var(--cyan-800);
`;

const optionAnswers = css`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
  margin-left: 6px;

  & .checkWrap {
    cursor: pointer;
    margin: 2px 0;
    padding: 6px;
    border-bottom: 1px solid var(--slate-200);

    & svg {
      margin-left: 12px;
    }
  }
`;

const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.settings.isOpen);
  const reverseOrder = useSelector(
    (state: RootState) => state.settings.reverseOrder
  );

  const sideBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpen && !sideBarRef.current?.contains(e.target as Element)) {
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
    <>
      <div css={[overlay]} className={`${isOpen && "open"}`} />
      <aside
        ref={sideBarRef}
        css={[sidebarStyle]}
        className={`${isOpen && "open"}`}
      >
        <div css={headerSection}>
          <div css={header}>Settings</div>
          <div css={logoWrap} onClick={() => dispatch(toggle())}>
            <img
              css={logo}
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="logo"
            />
          </div>
        </div>
        <div css={settingsSection}>
          <div css={option}>
            <div css={optionTitle}>Entry Order</div>
            <div css={optionAnswers}>
              <div
                className="checkWrap"
                onClick={() => dispatch(setOrderReverse(false))}
              >
                Normal
                {reverseOrder ? null : (
                  <FontAwesomeIcon icon={faCheck as IconProp} size="1x" />
                )}
              </div>
              <div
                className="checkWrap"
                onClick={() => dispatch(setOrderReverse(true))}
              >
                Reverse
                {reverseOrder ? (
                  <FontAwesomeIcon icon={faCheck as IconProp} size="1x" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Settings;
