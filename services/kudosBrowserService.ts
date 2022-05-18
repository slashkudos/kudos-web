import { ListKudosResponse } from "../models/ListKudosResponse";
import { SearchKudosByUserResponse } from "../pages/api/kudos/search";
import { Utilities } from "./utilities";

// DO NOT use KudosApiClient or KudosGraphQLConfig, for that use the KudosApiService.ts
// You will get error related to the fs module missing
export class KudosBrowserService {
  public static async getKudos(
    nextToken?: string | null
  ): Promise<ListKudosResponse> {
    const apiUrl = Utilities.API.kudosUrlAbsolute;
    let fullUrl = apiUrl;
    if (nextToken) {
      const searchParams = new URLSearchParams({
        nextToken: nextToken,
      });
      fullUrl += "?" + searchParams.toString();
    }
    return await KudosBrowserService.getKudosFetcher(fullUrl);
  }

  public static getKudosFetcher = async (
    url: string,
  ): Promise<ListKudosResponse> => {
    const rawResponse = await fetch(url);
    const response = (await rawResponse.json()) as ListKudosResponse;
    return response;
  };

  public static async searchKudos(
    searchValue: string,
    nextToken?: string | null
  ): Promise<SearchKudosByUserResponse> {
    if (!searchValue) {
      const response = await this.getKudos();
      return response;
    }
    const apiUrl = Utilities.API.kudosSearchUrlAbsolute;
    const searchParams = new URLSearchParams({
      username: searchValue,
    });
    if (nextToken) {
      searchParams.append("nextToken", nextToken);
    }

    const fullUrl = apiUrl + "?" + searchParams.toString();
    return await this.searchKudosFetcher(fullUrl);
  }

  public static async searchKudosFetcher(
    url: string,
  ): Promise<SearchKudosByUserResponse> {
    const response = await fetch(url);
    const searchResponse = (await response.json()) as SearchKudosByUserResponse;
    return searchResponse;
  }
}
