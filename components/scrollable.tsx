import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface Props
  extends PropsWithChildren<{
    onScrollBottom: () => void;
  }> {}

// https://stackoverflow.com/a/62497293/4215732
export default function Scrollable(props: Props): JSX.Element {
  const ref = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;

  const handleNavigation = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window;
      if (!window) return;

      console.log("scrollY: " + window.scrollY);
      const bottomHeight = (ref.current.scrollHeight * 2) / 3;
      console.log("scrollHeight: " + bottomHeight);

      if (window.scrollY >= bottomHeight) {
        props.onScrollBottom();
      }
    },
    [props]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <div id="scrollable" ref={ref}>
      {props.children}
    </div>
  );
}
