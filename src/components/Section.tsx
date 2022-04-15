/* eslint-disable no-param-reassign */
import { useDispatch, useSelector } from "react-redux";
import { Flipped } from "react-flip-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css, SerializedStyles } from "@emotion/react";

import { RootState } from "../redux/store";
import { open, toggleSection } from "../redux/reducers/sidebar";

const sectionStyle = css`
  --header-font-size: 18px;
  width: 100%;
  background: white;
  overflow: visible;

  height: calc(((var(--header-font-size) + var(--logo-v-margin)) * 2));

  &.expanded {
    height: auto;
  }
`;

const header = css`
  display: flex;
  background: white;
  z-index: 3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: var(--logo-v-margin) var(--logo-h-margin);
  font-size: var(--header-font-size);
  width: 100%;
  cursor: pointer;
  border-width: 1px 0 1px 0;
  border-color: transparent;
  border-style: solid;
  border-collapse: collapse;
  box-sizing: border-box;
  transition: border-color 0.5s ease-in-out 0s;

  .open & {
    border-color: var(--slate-200);
  }
`;

const content = css`
  font-size: 14px;
  max-width: fit-content;
  overflow: hidden;
  padding: 0;
  background: white;
  z-index: 1;
`;

const contentPadding = css`
  padding: var(--logo-v-margin) var(--logo-h-margin);
`;

const carat = css`
  justify-self: flex-start;
  transition: transform 0.2s ease-in-out 0s;
  margin-left: 2px;

  .expanded & {
    transform: rotate(90deg);
  }
`;

const iconWrap = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const title = css`
  margin-right: var(--logo-h-margin);
`;

const iconStyle = css`
  padding-right: calc((var(--logo-width) / 2) - var(--header-font-size));
`;

type SectionProps = {
  title: string;
  icon: IconProp;
  iconStyle?: SerializedStyles;
  content: JSX.Element;
  index: number;
};

function Section(props: SectionProps): JSX.Element {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const curSection = useSelector(
    (state: RootState) => state.sidebar.curSection
  );

  const handleClick = () => {
    if (!isOpen) {
      dispatch(open());
      dispatch(toggleSection(props.index));
    } else {
      dispatch(toggleSection(props.index));
    }
  };

  return (
    <Flipped translate flipId={`section-${props.index}`}>
      <section
        className={curSection === props.index ? "expanded" : ""}
        css={[
          sectionStyle,
          css`
            z-index: ${props.index + 10};
          `,
        ]}
      >
        <Flipped inverseFlipId={`section-${props.index}`} scale>
          <div css={header} onClick={handleClick}>
            <FontAwesomeIcon
              css={carat}
              icon={faAngleRight as IconProp}
              size="1x"
            />
            <div css={iconWrap}>
              <div css={title} className="fades">
                {props.title}
              </div>
              <FontAwesomeIcon
                css={[iconStyle, props.iconStyle]}
                icon={props.icon}
                size="2x"
              />
            </div>
          </div>
        </Flipped>
        <Flipped inverseFlipId={`section-${props.index}`} scale>
          <div css={content} className="fades">
            <div css={contentPadding}>{props.content}</div>
          </div>
        </Flipped>
      </section>
    </Flipped>
  );
}

export default Section;
