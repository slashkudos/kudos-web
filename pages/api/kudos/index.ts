import type { NextApiRequest, NextApiResponse } from "next";
import { ListKudosResponse } from "../../../models/ListKudosResponse";
import { KudosApiService } from "../../../services/kudosApiService";
import pino from "pino";
import { GitHubMetadata, ModelKudoConnection } from "@slashkudos/kudos-api";
const logger: pino.Logger = pino({
  level: process.env.NEXT_PUBLIC_LOG_LEVEL || "info",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListKudosResponse>
) {
  const nextToken = req.query.nextToken as string | undefined;
  const pageSize = req.query.pageSize
    ? Number.parseInt(req.query.pageSize as string)
    : Number.parseInt(process.env.DEFAULT_FEED_PAGE_SIZE || "25");

  const client = await KudosApiService.getClient();
  logger.debug("Fetching kudos...");
  const kudosConnection = await client.listKudosByDate({
    type: "Kudo",
    limit: pageSize,
    nextToken: nextToken,
  });
  filterKudos(kudosConnection);
  return res
    .status(200)
    .json(new ListKudosResponse({ response: kudosConnection }));
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
