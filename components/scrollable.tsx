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

export default function Scrollable(props: Props): JSX.Element {
  const ref = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;

  const handleNavigation = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window;
      if (!window) return;

      const bottomHeight = ref.current.scrollHeight;

      const bottomY = window.scrollY + window.innerHeight;

      if (bottomY >= bottomHeight) {
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
