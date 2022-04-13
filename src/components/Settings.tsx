import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { setOrderReverse } from "../redux/reducers/settings";

const settingsSection = css`
  height: 100%;
  padding: 6px 24px 24px 24px;
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
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

function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const reverseOrder = useSelector(
    (state: RootState) => state.settings.reverseOrder
  );

  return (
    <section css={settingsSection} className="fades">
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
    </section>
  );
}

export default Settings;
