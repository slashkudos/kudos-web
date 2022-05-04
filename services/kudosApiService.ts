import pino from "pino";
import { KudosApiClient, KudosGraphQLConfig } from "@slashkudos/kudos-api";

export class KudosApiService {
  static logger: pino.Logger = pino({
    level: process.env.LOG_LEVEL || "info",
  });

  public static async getClient(): Promise<KudosApiClient> {
    const apiKey = process.env.KUDOS_GRAPHQL_API_KEY;
    const apiUrl = process.env.KUDOS_GRAPHQL_API_URL;
    if (!apiKey) {
      throw new Error("KUDOS_GRAPHQL_API_KEY environment variable is not set.");
    }
    if (!apiUrl) {
      throw new Error("KUDOS_GRAPHQL_API_URL environment variable is not set.");
    }

    const config: KudosGraphQLConfig = {
      ApiKey: apiKey,
      ApiUrl: apiUrl,
    };
    const client = await KudosApiClient.build(config);

    const message = `KudosApiClient built (api url: ${apiUrl}`;
    KudosApiService.logger.debug(message);

    return client;
  }
}
