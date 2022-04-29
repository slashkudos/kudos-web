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

interface State {
  height: number;
}

// https://stackoverflow.com/a/62497293/4215732
export default class Scrollable extends React.Component<Props, State> {
  ref: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const height = this.ref.clientHeight;
    this.setState({ height });
  }

  render() {
    return (
      <div className="test" ref={(span) => (this.ref = span)}>
        Size: <b>{this.state.height}px</b> but it should be 18px after the
        render
      </div>
    );
  }

  // const [y, setY] = useState(window.scrollY);
  // const [height, setHeight] = useState(0);
  // const ref = useRef(
  //   null
  // ) as unknown as React.MutableRefObject<HTMLSpanElement>;

  // useLayoutEffect(() => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   console.log("Height: " + ref.current.clientHeight);
  //   setHeight(ref.current.clientHeight);
  // }, [height]);

  // const handleNavigation = useCallback(
  //   (e) => {
  //     const window = e.currentTarget;
  //     if (y > window.scrollY) {
  //       console.log("scrolling up");
  //     } else if (y < window.scrollY) {
  //       console.log("scrolling down");
  //     }
  //     setY(window.scrollY);
  //   },
  //   [y]
  // );

  // useEffect(() => {
  //   setY(window.scrollY);
  //   window.addEventListener("scroll", handleNavigation);

  //   return () => {
  //     window.removeEventListener("scroll", handleNavigation);
  //   };
  // }, [handleNavigation]);

  // return (
  //   <span ref={ref}>
  //     {height}
  //     {props.children}
  //   </span>
  // );
}
