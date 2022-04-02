import { Kudo } from "@slashkudos/kudos-api";
import { Dispatch, SetStateAction } from "react";
import { SearchKudosByUserResponse } from "../pages/api/kudos/search";
import { Utilities } from "./utilities";
const logger = require("pino")();

// DO NOT use KudosApiClient or KudosGraphQLConfig, for that use the KudosApiService.ts
// You will get error related to the fs module missing
export class KudosBrowserService {
  public static async getKudos(): Promise<Kudo[]> {
    const url = Utilities.API.kudosUrlAbsolute;
    return await KudosBrowserService.getKudosFetcher(url);
  }

  public static getKudosFetcher = async (
    url: string,
    setKudosDispatcher?: Dispatch<SetStateAction<Kudo[] | undefined>>
  ): Promise<Kudo[]> => {
    const response = await fetch(url);
    const kudos = (await response.json()) as Kudo[];
    if (setKudosDispatcher) setKudosDispatcher(kudos);
    return kudos;
  };

  public static async searchKudos(
    searchValue: string
  ): Promise<SearchKudosByUserResponse | undefined> {
    if (!searchValue) {
      const kudos = await this.getKudos();
      return { result: kudos };
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
    setKudosDispatcher?: Dispatch<SetStateAction<Kudo[] | undefined>>
  ) {
    const response = await fetch(url);
    const searchResponse = (await response.json()) as SearchKudosByUserResponse;
    const kudos = searchResponse.result || [];
    if (setKudosDispatcher) setKudosDispatcher(kudos);
    return kudos;
  }
}
