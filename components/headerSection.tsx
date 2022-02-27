import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {}

export default function HeaderSection({}: Props): JSX.Element {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
        </div>
      </header>
    </>
  );
}
