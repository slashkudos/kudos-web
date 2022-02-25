import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataSourceApp, Kudo } from "@slashkudos/kudos-api";
import { PropsWithChildren } from "react";
import Image from "next/image";

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

const getOriginalQualityImageUrl = (url: string) => {
  return url.replace("_normal.jpg", ".jpg");
};

export default function FeedCard({ kudo }: Props): JSX.Element {
  const sourceAppIcon = getSourceAppIcon(kudo);
  const createdDate = new Date(kudo.createdAt)
    .toLocaleString()
    .toLocaleLowerCase();
  const receiverImage = getOriginalQualityImageUrl(
    "https://pbs.twimg.com/profile_images/1459685294731575304/a9_elCO4_normal.jpg"
  );

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <Image
            src={receiverImage}
            alt={`${kudo.receiver?.username}'s profile picture`}
            width={50}
            height={50}
            className="rounded-full"
          ></Image>
          <div className="font-bold text-xl mb-2">
            <a href={kudo.link}>{kudo.message}</a>
          </div>
          <p className="text-gray-700 text-base">
            {createdDate}
            <br />
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
