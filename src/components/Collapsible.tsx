/* eslint-disable no-void */
/* eslint-disable no-param-reassign */
import type { TransitionProps } from "react-transition-group/Transition";
import { Transition } from "react-transition-group";

interface HTMLExpandElement extends HTMLElement {
  _parent?: (Node & ParentNode & HTMLElement) | null;
  _initialStyle?: {
    transition: string;
    visibility: string;
    overflow: string;
    height?: string | null;
    width?: string | null;
  };
}

type CollapsibleProps = Omit<TransitionProps, "addEndListener"> & {
  show: boolean;
  xAxis?: boolean;
  expandedParentClass?: string;
};

function Collapsible({
  show = true,
  timeout = 500,
  yAxis = true,
  expandedParentClass = "",
  children,
  ...rest
}: CollapsibleProps): JSX.Element {
  const sizeProperty = yAxis ? "height" : ("width" as "width" | "height");
  const offsetProperty = yAxis
    ? "offsetHeight"
    : ("offsetWidth" as "offsetWidth" | "offsetHeight");

  const resetStyles = (el: HTMLExpandElement): void => {
    if (!el._initialStyle) return;
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null) el.style[sizeProperty] = size;
    delete el._initialStyle;
  };

  const onEnterDefault = (
    el: HTMLExpandElement,
    isAppearing: boolean
  ): void => {
    el._parent = el.parentNode as (Node & ParentNode & HTMLElement) | null;
    // el.style.display = "block";
    el._initialStyle = {
      transition: el.style.transition,
      visibility: el.style.visibility,
      overflow: el.style.overflow,
      [sizeProperty]: el.style[sizeProperty],
    };
  };

  const onEnteringDefault = (
    el: HTMLExpandElement,
    isAppearing: boolean
  ): void => {
    const initialStyle = el._initialStyle;
    if (!initialStyle) return;
    const offset = `${el[offsetProperty]}px`;

    el.style.setProperty("transition", "none", "important");
    el.style.visibility = "hidden";
    el.style.visibility = initialStyle.visibility;
    el.style.overflow = "hidden";
    el.style[sizeProperty] = "0";

    void el.offsetHeight; // force reflow

    el.style.transition =
      initialStyle.transition !== ""
        ? initialStyle.transition
        : `${sizeProperty} ${timeout}ms ease-in-out`;

    if (expandedParentClass && el._parent) {
      el._parent.classList.add(expandedParentClass);
    }

    requestAnimationFrame(() => {
      el.style[sizeProperty] = offset;
    });
  };
  const onEnteredDefault = resetStyles;

  const onExitDefault = (el: HTMLExpandElement): void => {
    if (el.style.transition === "")
      el.style.transition = `${sizeProperty} ${timeout}ms ease-in-out`;
  };

  const onExitingDefault = (el: HTMLExpandElement): void => {
    el._initialStyle = {
      transition: "",
      visibility: "",
      overflow: el.style.overflow,
      [sizeProperty]: el.style[sizeProperty],
    };

    el.style.overflow = "hidden";
    el.style[sizeProperty] = `${el[offsetProperty]}px`;
    void el.offsetHeight; // force reflow
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    requestAnimationFrame(() => {
      el.style[sizeProperty] = "0";
    });
  };

  const onExitedDefault = (el: HTMLExpandElement): void => {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    // el.style.display = "none";
    resetStyles(el);
  };

  return (
    <Transition<undefined>
      in={show}
      timeout={timeout}
      onEnter={onEnterDefault}
      onEntering={onEnteringDefault}
      onEntered={onEnteredDefault}
      onExit={onExitDefault}
      onExiting={onExitingDefault}
      onExited={onExitedDefault}
      unmountOnExit
      {...rest}
    >
      {children}
    </Transition>
  );
}

export default Collapsible;
