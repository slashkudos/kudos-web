import { Kudo } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { KudosApiService } from "../../../services/kudosApiService";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Kudo[]>
) {
  const client = await KudosApiService.getClient();
  const kudosConnection = await client.listKudosByDate();
  const kudosResult = kudosConnection.items.filter(
    (kudo) => kudo != null
  ) as Kudo[];
  return res.status(200).json(kudosResult);
}
