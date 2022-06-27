import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataSourceApp, Kudo, Person } from "@slashkudos/kudos-api";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import Image from "next/image";
import { Utilities } from "../services/utilities";

interface Props
  extends PropsWithChildren<{
    kudo: Kudo;
    onUsernameClick: (username: string) => void;
  }> {}

const getSourceAppIcon = (kudo: Kudo): JSX.Element => {
  switch (kudo.dataSourceApp) {
    case "twitter" as DataSourceApp.twitter:
      return <FontAwesomeIcon icon={["fab", "twitter"]} fixedWidth />;
    case "github" as DataSourceApp.github:
      return <FontAwesomeIcon icon={["fab", "github"]} fixedWidth />;
    default:
      return <></>;
  }
};

const getUserImage = (
  person: Person,
  profileImageError: boolean,
  setProfileImageErrorDispatcher: Dispatch<SetStateAction<boolean>>
): JSX.Element => {
  let imageUrl = person?.profileImageUrl;
  const profileUrl = getUserProfileUrl(person);

  if (person?.dataSourceApp === "twitter") {
    imageUrl = imageUrl?.replace("_normal.jpg", ".jpg");
  }
  if (imageUrl) {
    return (
      <a href={profileUrl} className={profileImageError ? "" : "pr-2"}>
        {profileImageError ? (
          <FontAwesomeIcon
            icon={["fas", "face-smile-beam"]}
            size="3x"
            fixedWidth
          />
        ) : (
          <Image
            src={imageUrl}
            title={person?.username}
            alt={`${person?.username}'s profile picture`}
            width={50}
            height={50}
            className="rounded-full"
            onError={(e) => {
              setProfileImageErrorDispatcher(true);
            }}
          ></Image>
        )}
      </a>
    );
  } else {
    return <></>;
  }
};

const getUserProfileHyperlink = (
  person: Person,
  onUsernameClick: (username: string) => void
): JSX.Element => {
  return (
    <a
      className="font-bold"
      href="#"
      onClick={() => {
        onUsernameClick(person.username);
      }}
    >
      {person?.username}
    </a>
  );
};

const getUserProfileUrl = (person: Person): string | undefined => {
  if (!person) return;
  if (person.profileUrl) return person.profileUrl;
  switch (person.dataSourceApp) {
    case "twitter" as DataSourceApp.twitter:
      return `https://twitter.com/${person.username}`;
  }
};

export default function FeedCard(props: Props): JSX.Element {
  const kudo = props.kudo;
  const { receiver, giver } = kudo;
  if (!receiver || !giver) {
    throw new Error("Kudo must have receiver and giver");
  }
  const sourceAppIcon = getSourceAppIcon(kudo);
  const createdDate = new Date(kudo.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const createdDateTime = new Date(kudo.createdAt).toLocaleString();

  const [receiverProfileImageError, setReceiverProfileImageError] =
    useState(false);
  const receiverHyperlink = getUserProfileHyperlink(
    receiver,
    props.onUsernameClick
  );
  const receiverImage = getUserImage(
    receiver,
    receiverProfileImageError,
    setReceiverProfileImageError
  );

  const [giverProfileImageError, setGiverProfileImageError] = useState(false);
  const giverHyperlink = getUserProfileHyperlink(giver, props.onUsernameClick);
  const giverImage = getUserImage(
    giver,
    giverProfileImageError,
    setGiverProfileImageError
  );

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg mb-4">
        <div>
          <div className="p-6 bg-gray-100 shadow">
            <div className="flex">
              {receiverImage} {giverImage}
            </div>
            <div className="pt-2">
              {receiverHyperlink} received kudos from {giverHyperlink} on{" "}
              <abbr className="no-underline" title={createdDateTime}>
                {createdDate}
              </abbr>
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
