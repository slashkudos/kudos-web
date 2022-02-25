import { KudosApiClient, KudosGraphQLConfig } from "@slashkudos/kudos-api";
const logger = require("pino")();

export class KudosService {
  public static async getClient(): Promise<KudosApiClient> {
    const apiKey = process.env.KUDOS_GRAPHQL_API_KEY;
    const apiUrl = process.env.KUDOS_GRAPHQL_ENDPOINT;
    if (!apiKey) {
      throw new Error("KUDOS_GRAPHQL_API_KEY environment variable is not set.");
    }
    if (!apiUrl) {
      throw new Error(
        "KUDOS_GRAPHQL_ENDPOINT environment variable is not set."
      );
    }

    const config: KudosGraphQLConfig = {
      ApiKey: apiKey,
      ApiUrl: apiUrl,
    };
    const client = await KudosApiClient.build(config);

    const message = `KudosApiClient built (api url: ${apiUrl}`;
    logger.debug(message);

    return client;
  }
}
