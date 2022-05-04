import pino from "pino";
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
  const logger: pino.Logger = pino({
    level: process.env.LOG_LEVEL || "info",
  });

  const ref = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;

  const handleNavigation = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window;
      if (!window) return;

      const bottomHeight = ref.current.scrollHeight;

      logger.debug(`bottomHeight: ${bottomHeight}\nscrollY: ${window.scrollY}`);

      const bottomY = window.scrollY + window.innerHeight;

      if (bottomY >= bottomHeight) {
        props.onScrollBottom();
      }
    },
    [props, logger]
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
