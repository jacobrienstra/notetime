import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { setOrderReverse } from "../redux/reducers/settings";

const settingsSection = css`
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  min-height: 0px;
  flex: 1 1 0px;
  margin-bottom: auto;
`;

const paddingWrap = css`
  padding: 6px 24px 24px 24px;
`;

const option = css`
  margin-bottom: 30px;
`;

const optionAnswers = css`
  font-size: 18px;
  display: flex;

  transition: all 0.5s;
  margin-left: 6px;
  flex-direction: column;
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
      <div css={paddingWrap}>
        <div css={option}>
          <h4>Entry Order</h4>
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
    </section>
  );
}

export default Settings;
