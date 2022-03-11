import Navbar from "./navbar";
import Footer from "./footer";
import { PropsWithChildren } from "react";
import HeaderSection from "./headerSection";

interface Props extends PropsWithChildren<{}> {}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
