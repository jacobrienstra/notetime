import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { setOrderReverse } from "../redux/reducers/settings";

const settingsSection = css`
  flex: 1 1 0px;
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  min-height: 0;
`;

const paddingWrap = css`
  padding: 6px 24px 24px 24px;
`;

const option = css`
  margin-bottom: 30px;
`;

const optionAnswers = css`
  display: flex;
  flex-direction: column;
  margin-left: 6px;

  font-size: 18px;

  transition: all 0.5s;

  & .checkWrap {
    margin: 2px 0;
    padding: 6px;

    border-bottom: 1px solid var(--slate-200);
    cursor: pointer;

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
