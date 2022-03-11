import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataSourceApp, Kudo, Person } from "@slashkudos/kudos-api";
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

const getUserImage = (person?: Person | null): JSX.Element => {
  const imageUrl = person?.profileImageUrl;
  const profileUrl = getUserProfileUrl(person);

  const urlOriginalQuality = imageUrl?.replace("_normal.jpg", ".jpg");
  if (urlOriginalQuality) {
    return (
      <a href={profileUrl} className="pr-2">
        <Image
          src={urlOriginalQuality}
          alt={`${person?.username}'s profile picture`}
          width={50}
          height={50}
          className="rounded-full"
        ></Image>
      </a>
    );
  } else {
    return <></>;
  }
};

const getUserProfileHyperlink = (person?: Person | null): JSX.Element => {
  const profileUrl = getUserProfileUrl(person);
  return (
    <a className="font-bold" href={profileUrl}>
      {person?.username}
    </a>
  );
};

const getUserProfileUrl = (person?: Person | null): string | undefined => {
  if (!person) return;
  switch (person.dataSourceApp) {
    case "twitter" as DataSourceApp.twitter:
      return `https://twitter.com/${person.username}`;
  }
};

export default function FeedCard({ kudo }: Props): JSX.Element {
  const sourceAppIcon = getSourceAppIcon(kudo);
  const createdDate = new Date(kudo.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const receiverHyperlink = getUserProfileHyperlink(kudo.receiver);
  const receiverImage = getUserImage(kudo.receiver);

  const giverHyperlink = getUserProfileHyperlink(kudo.giver);
  const giverImage = getUserImage(kudo.giver);

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg mb-4">
        <div>
          <div className="p-6 bg-gray-100 shadow">
            <div>
              {receiverImage} {giverImage}
            </div>
            <div className="pt-2">
              {receiverHyperlink} received kudos from {giverHyperlink} on{" "}
              {createdDate}
            </div>
          </div>
          <div className="p-6">
            <a className="text-xl" href={kudo.link}>
              {kudo.message}
            </a>
          </div>
        </div>
        <div className="px-6 pb-2">
          <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {sourceAppIcon}
          </div>
        </div>
      </div>
    </>
  );
}
