import { Kudo } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { ListKudosResponse } from "../../../models/ListKudosResponse";
import { KudosApiService } from "../../../services/kudosApiService";
import pino from "pino";
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
  const kudosResult = kudosConnection.items.filter(
    (kudo) => kudo != null
  ) as Kudo[];
  return res
    .status(200)
    .json({ result: kudosResult, response: kudosConnection });
}
