import { Kudo } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { ListKudosResponse } from "../../../models/ListKudosResponse";
import { KudosApiService } from "../../../services/kudosApiService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListKudosResponse>
) {
  const nextToken = req.query.nextToken as string | undefined;
  
  const client = await KudosApiService.getClient();
  const kudosConnection = await client.listKudosByDate({
    type: "Kudo",
    limit: 1,
    nextToken: nextToken
  });
  const kudosResult = kudosConnection.items.filter(
    (kudo) => kudo != null
  ) as Kudo[];
  console.log("Kudos Connection: ", JSON.stringify(kudosConnection));
  return res.status(200).json({ result: kudosResult, response: kudosConnection });
}
