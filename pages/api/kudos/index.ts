import { Kudo } from "@slashkudos/kudos-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { KudosService } from "../../../services/kudosService";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await KudosService.getClient();
  const kudosConnection = await client.listKudos({});
  const kudosResult = (
    kudosConnection.items.filter((kudo) => kudo != null) as Kudo[]
  ).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.status(200).json(kudosResult);
}
