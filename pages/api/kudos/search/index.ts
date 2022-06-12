import {
  GitHubMetadata,
  Kudo,
  ModelKudoConnection,
} from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { KudosApiService } from "../../../../services/kudosApiService";
import pino from "pino";
import { SearchKudosByUserResponse } from "../../../../models/SearchKudosByUserResponse";
const logger: pino.Logger = pino({
  level: process.env.NEXT_PUBLIC_LOG_LEVEL || "info",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchKudosByUserResponse>
) {
  const username = req.query.username as string;
  const pageSize = req.query.pageSize
    ? Number.parseInt(req.query.pageSize as string)
    : Number.parseInt(process.env.DEFAULT_FEED_PAGE_SIZE || "25");
  const nextToken = req.query.nextToken as string | undefined;

  const client = await KudosApiService.getClient();
  if (!username) {
    return res
      .status(400)
      .json(new SearchKudosByUserResponse({ error: "username is required" }));
  }
  logger.debug("Searching for kudos by user: " + username);
  const kudosConnection = await client.searchKudosByUser(username, {
    limit: pageSize,
    nextToken,
  });
  filterKudos(kudosConnection);
  return res
    .status(200)
    .json(new SearchKudosByUserResponse({ response: kudosConnection }));
}

function filterKudos(kudosConnection: ModelKudoConnection) {
  kudosConnection.items = kudosConnection.items.filter((item) => {
    // FIXME: Filter out private repo kudos for now
    if (item?.dataSourceApp === "github") {
      if (!item.metadata) return false;
      try {
        const metadata = JSON.parse(item.metadata) as GitHubMetadata;
        return metadata.repositoryPublic;
      } catch (error) {
        return false;
      }
    }
    return true;
  });
}
