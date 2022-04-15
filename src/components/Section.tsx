/* eslint-disable no-param-reassign */
import { useDispatch, useSelector } from "react-redux";
import { Flipped } from "react-flip-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css, SerializedStyles } from "@emotion/react";

import { RootState } from "../redux/store";
import { open, toggleSection } from "../redux/reducers/sidebar";

const sectionRoot = css`
  // Define header font size so calculate the height of collapsed section (for animation reasons, and so content can stay on page)
  --header-font-size: 18px;
  width: 100%;

  height: calc(((var(--header-font-size) + var(--logo-ver-margin)) * 2));
  overflow: visible;

  background: white;

  &.expanded {
    height: auto;

    .carat {
      transform: rotate(90deg);
    }
  }

  header {
    z-index: 3;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: var(--logo-ver-margin) var(--logo-hor-margin);

    font-size: var(--header-font-size);

    background: white;
    border-color: transparent;
    border-style: solid;
    border-width: 1px 0;
    border-collapse: collapse;
    cursor: pointer;

    transition: border-color 0.5s ease-in-out 0s;

    .open & {
      border-color: var(--slate-200);
    }

    .title-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      height: 100%;

      .title {
        margin-right: var(--logo-hor-margin);
      }

      svg {
        padding-right: calc((var(--logo-width) / 2) - var(--header-font-size));
      }
    }
  }

  .carat {
    justify-self: flex-start;
    margin-left: 2px;

    transition: transform 0.3s ease-in-out 0s;

    will-change: transform;
  }

  .section-content {
    z-index: 1;

    max-width: fit-content;
    padding: 0;
    overflow: hidden;

    font-size: 18px;

    background: white;
    padding: var(--logo-ver-margin) var(--logo-hor-margin);
  }
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
          sectionRoot,
          css`
            z-index: ${props.index + 10};
          `,
        ]}
      >
        <Flipped inverseFlipId={`section-${props.index}`} scale>
          <header onClick={handleClick} role="button" tabIndex={0}>
            <FontAwesomeIcon
              className="carat"
              icon={faAngleRight as IconProp}
              size="1x"
            />
            <div className="title-wrapper">
              <div className="title fades">{props.title}</div>
              <FontAwesomeIcon
                css={props.iconStyle}
                icon={props.icon}
                size="2x"
              />
            </div>
          </header>
        </Flipped>
        <Flipped inverseFlipId={`section-${props.index}`} scale>
          <div className="section-content fades">{props.content}</div>
        </Flipped>
      </section>
    </Flipped>
  );
}

export default Section;
