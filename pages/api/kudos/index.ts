import { Kudo } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { ListKudosResponse } from "../../../models/ListKudosResponse";
import { KudosApiService } from "../../../services/kudosApiService";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ListKudosResponse>
) {
  const client = await KudosApiService.getClient();
  const kudosConnection = await client.listKudosByDate({
    type: "Kudo",
    limit: 25,
  });
  const kudosResult = kudosConnection.items.filter(
    (kudo) => kudo != null
  ) as Kudo[];
  return res.status(200).json({ result: kudosResult, response: kudosConnection });
}
