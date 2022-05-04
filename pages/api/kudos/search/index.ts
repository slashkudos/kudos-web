import { Kudo, ModelKudoConnection } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseResult } from "../../../../models/ApiResponse";
import { KudosApiService } from "../../../../services/kudosApiService";

export interface SearchKudosByUserResponse extends ApiResponseResult<ModelKudoConnection, Kudo[]> {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchKudosByUserResponse>
) {
  const client = await KudosApiService.getClient();
  const username = req.query.username as string;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }
  const kudosConnection = await client.searchKudosByUser(username);
  const kudosResult = kudosConnection.items.filter(
    (kudo) => kudo != null
  ) as Kudo[];
  console.log("Kudos Connection: ", JSON.stringify(kudosConnection));
  return res.status(200).json({ result: kudosResult, response: kudosConnection });
}
