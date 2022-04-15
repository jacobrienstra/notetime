import { useDispatch, useSelector } from "react-redux";
import { Flipped, Flipper } from "react-flip-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";
import { setOrderReverse } from "../redux/reducers/settings";

const settingsRoot = css`
  flex: 1 1 0px;
  box-sizing: border-box;
  width: 100%;
  min-width: 300px;
  min-height: 0;

  .wrapper {
    padding: 6px 24px 24px 24px;

    .setting {
      margin-bottom: 30px;

      .setting-options {
        display: flex;
        flex-direction: column;
        margin-left: 6px;

        font-size: 18px;

        transition: all 0.5s;

        .setting-option {
          margin: 2px 0;
          padding: 6px;

          border-bottom: 1px solid var(--slate-200);
          cursor: pointer;

          svg {
            margin-left: 12px;
          }
        }
      }
    }
  }
`;

function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const reverseOrder = useSelector(
    (state: RootState) => state.settings.reverseOrder
  );

  return (
    <section css={settingsRoot} className="fades">
      <div className="wrapper">
        <div className="setting">
          <h4>Entry Order</h4>
          <div className="setting-options">
            <Flipper flipKey={reverseOrder}>
              <div
                role="option"
                tabIndex={0}
                className="setting-option"
                aria-selected={!reverseOrder}
                onClick={() => dispatch(setOrderReverse(false))}
              >
                Normal
                <Flipped flipId="checkmark">
                  {reverseOrder ? null : (
                    <FontAwesomeIcon icon={faCheck as IconProp} size="1x" />
                  )}
                </Flipped>
              </div>
              <div
                role="option"
                tabIndex={0}
                className="setting-option"
                aria-selected={reverseOrder}
                onClick={() => dispatch(setOrderReverse(true))}
              >
                Reverse
                <Flipped flipId="checkmark">
                  {reverseOrder ? (
                    <FontAwesomeIcon icon={faCheck as IconProp} size="1x" />
                  ) : null}
                </Flipped>
              </div>
            </Flipper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
