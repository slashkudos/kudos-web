import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {}

export default function FeedCard({}: Props): JSX.Element {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            @slashkudos Great job on the demo! 🎉
          </div>
          <p className="text-gray-700 text-base">
            From: philipgai_dev<br/>To: elizabethgai
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <FontAwesomeIcon icon={["fab", "twitter"]} fixedWidth />
          </div>
        </div>
      </div>
    </>
  );
}
