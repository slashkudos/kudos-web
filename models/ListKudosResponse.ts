import { Kudo, ModelKudoConnection } from "@slashkudos/kudos-api";
import { ApiResponse } from "./ApiResponse";

export class ListKudosResponse extends ApiResponse<ModelKudoConnection> {
  public get result(): Kudo[] {
    return (
      (this.response?.items.filter((item) => item != null) as Kudo[]) || []
    );
  }
}
