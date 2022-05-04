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
  const nextToken = req.query.nextToken as string | undefined;

  const client = await KudosApiService.getClient();
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }
  const pageSize = process.env.FEED_PAGE_SIZE
    ? Number.parseInt(process.env.FEED_PAGE_SIZE)
    : 2;
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
