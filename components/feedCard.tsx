import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataSourceApp, Kudo } from "@slashkudos/kudos-api";
import { PropsWithChildren } from "react";

interface Props
  extends PropsWithChildren<{
    kudo: Kudo;
  }> {}

const getSourceAppIcon = (kudo: Kudo): JSX.Element => {
  switch (kudo.dataSourceApp) {
    case "twitter" as DataSourceApp.twitter:
      return <FontAwesomeIcon icon={["fab", "twitter"]} fixedWidth />;
    default:
      return <></>;
  }
};

export default function FeedCard({ kudo }: Props): JSX.Element {
  const sourceAppIcon = getSourceAppIcon(kudo);

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{kudo.message}</div>
          <p className="text-gray-700 text-base">
            From: {kudo.giver?.username}
            <br />
            To: {kudo.receiver?.username}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {sourceAppIcon}
          </div>
        </div>
      </div>
    </>
  );
}
