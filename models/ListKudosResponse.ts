import { Kudo, ModelKudoConnection } from "@slashkudos/kudos-api";
import { ApiResponseResult } from "./ApiResponse";

export interface ListKudosResponse extends ApiResponseResult<ModelKudoConnection, Kudo[]> {}
