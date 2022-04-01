import { Kudo } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { KudosService } from "../../../services/kudosService";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Kudo[]>
) {
  const client = await KudosService.getClient();
  const kudosConnection = await client.listKudosByDate();
  const kudosResult = kudosConnection.items.filter((kudo) => kudo != null) as Kudo[];
  return res.status(200).json(kudosResult);
}
