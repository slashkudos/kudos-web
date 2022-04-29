import React, { Component, PropsWithChildren } from "react";

interface Props
  extends PropsWithChildren<{
    onScrollBottom: () => void
  }> {
}

  export default function Scrollable(props: Props): JSX.Element {
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom) {
      console.log("bottom reached");
      props.onScrollBottom();
    }
  }

    return (
      <span onScroll={handleScroll}>
        {props.children}
      </span>
    );
}