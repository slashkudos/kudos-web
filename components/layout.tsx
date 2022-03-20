import Navbar from "./navbar";
import Footer from "./footer";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {}

export default function Layout(props: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
