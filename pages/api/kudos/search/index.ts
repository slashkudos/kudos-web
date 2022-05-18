import { Kudo, ModelKudoConnection } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseResult } from "../../../../models/ApiResponse";
import { KudosApiService } from "../../../../services/kudosApiService";

export interface SearchKudosByUserResponse
  extends ApiResponseResult<ModelKudoConnection, Kudo[]> {}

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
    return res.status(400).json({ error: "username is required" });
  }
  const kudosConnection = await client.searchKudosByUser(
    username,
    pageSize,
    nextToken
  );
  const kudosResult = kudosConnection.items.filter(
    (kudo) => kudo != null
  ) as Kudo[];
  return res
    .status(200)
    .json({ result: kudosResult, response: kudosConnection });
}
