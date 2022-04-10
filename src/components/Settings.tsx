import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { toggle, setOrderReverse } from "../redux/reducers/settings";

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
  overflow-x: hidden;
  box-sizing: border-box;
  font-family: monospace;
  background: rgba(256, 256, 256, 0);
  transition: all 0.5s ease-in-out 0s;
  transform: translateX(
    calc(-100% + var(--logo-width) + var(--logo-margin) * 2)
  );
`;

const sidebarOpen = css`
  transform: translateX(0);
  background: rgba(256, 256, 256, 1);
`;

const logo = css`
  width: var(--logo-width);
  &:hover {
    transform: scale(1.1);
    /* content: url(${process.env.PUBLIC_URL}/logo192shadow.png); */
  }
`;

const logoWrap = css`
  align-self: flex-end;
  /* margin: var(--logo-margin); */
  cursor: pointer;
`;

const headerSection = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--logo-margin);
`;

const settingsStyle = css`
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
`;

const header = css`
  font-size: 42px;
  margin: 0 36px 0 6px;
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
  margin-left: 24px;

  & .checkWrap {
    cursor: pointer;
    margin: 2px 0;

    & svg {
      margin-right: 12px;
    }
  }
`;

function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.settings.isOpen);
  const reverseOrder = useSelector(
    (state: RootState) => state.settings.reverseOrder
  );

  return (
    <aside className="settings" css={[sidebarStyle, isOpen && sidebarOpen]}>
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
      <div css={[settingsStyle]}>
        <div css={option}>
          <div css={optionTitle}>Entry Order</div>
          <div css={optionAnswers}>
            <div
              className="checkWrap"
              onClick={() => dispatch(setOrderReverse(false))}
            >
              <FontAwesomeIcon
                icon={
                  reverseOrder
                    ? (faSquare as IconProp)
                    : (faSquareCheck as IconProp)
                }
                size="1x"
              />
              Normal
            </div>
            <div
              className="checkWrap"
              onClick={() => dispatch(setOrderReverse(true))}
            >
              <FontAwesomeIcon
                icon={
                  reverseOrder
                    ? (faSquareCheck as IconProp)
                    : (faSquare as IconProp)
                }
                size="1x"
              />
              Reverse
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Settings;
