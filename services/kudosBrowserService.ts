import { Dispatch, SetStateAction } from "react";
import { ListKudosResponse } from "../models/ListKudosResponse";
import { SearchKudosByUserResponse } from "../pages/api/kudos/search";
import { Utilities } from "./utilities";
const logger = require("pino")();

// DO NOT use KudosApiClient or KudosGraphQLConfig, for that use the KudosApiService.ts
// You will get error related to the fs module missing
export class KudosBrowserService {
  public static async getKudos(): Promise<ListKudosResponse> {
    const url = Utilities.API.kudosUrlAbsolute;
    return await KudosBrowserService.getKudosFetcher(url);
  }

  public static getKudosFetcher = async (
    url: string,
    setKudosDispatcher?: Dispatch<SetStateAction<ListKudosResponse | undefined>>
  ): Promise<ListKudosResponse> => {
    const rawResponse = await fetch(url);
    const response = (await rawResponse.json()) as ListKudosResponse;
    if (setKudosDispatcher) setKudosDispatcher(response);
    return response;
  };

  public static async searchKudos(
    searchValue: string
  ): Promise<SearchKudosByUserResponse | undefined> {
    if (!searchValue) {
      const response = await this.getKudos();
      return response;
    }
    const url = Utilities.API.kudosSearchUrlAbsolute + "?";
    const searchParams = new URLSearchParams({
      username: searchValue,
    });
    const response = await fetch(url + searchParams.toString());
    const searchResponse = (await response.json()) as SearchKudosByUserResponse;
    return searchResponse;
  }

  public static async searchKudosFetcher(
    url: string,
    setKudosDispatcher?: Dispatch<SetStateAction<SearchKudosByUserResponse | undefined>>
  ) {
    const response = await fetch(url);
    const searchResponse = (await response.json()) as SearchKudosByUserResponse;
    if (setKudosDispatcher) setKudosDispatcher(searchResponse);
    return searchResponse;
  }
}
