import React, {
  Component,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Props
  extends PropsWithChildren<{
    onScrollBottom: () => void;
  }> {}

// https://stackoverflow.com/a/62497293/4215732
export default function Scrollable(props: Props): JSX.Element {
  const [y, setY] = useState(window.scrollY);
  const [height, setHeight] = useState(0);
  const ref = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    console.log("Height: " + ref.current.clientHeight);
    setHeight(ref.current.clientHeight);
  }, [height]);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        console.log("scrolling up");
      } else if (y < window.scrollY) {
        console.log("scrolling down");
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return <div ref={ref}>{props.children}</div>;
}
